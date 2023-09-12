import "cypress-file-upload";
import "cypress-plugin-api";
import "@testing-library/cypress/add-commands";
import HomePage from "../pageObjects/homePage";

Cypress.Commands.add("querySelectorIncludesText", (selector, text) => {
  return Array.from(document.querySelectorAll(selector)).find((el) =>
    el.textContent.includes(text)
  );
});

Cypress.Commands.add("login", (username, password, host, siteminder) => {
  const home = new HomePage();

  // Go to the host
  cy.visit(host || Cypress.env("host"));
  
  // Force clean up
  cy.clearCookies();
  cy.clearLocalStorage()
  cy.clearAllSessionStorage()
  cy.reload();

  const sentArgs = { user: username, pass: password };

  // Validate the host
  cy.get("h1")
    .contains("Common Hosted Single Sign-on (CSS)")
    .should("be.visible");

  // Click the login button
  home.clickLoginButton();

  // Validate the login proxy
  cy.origin(Cypress.env("loginproxy"), () => {
    cy.get("#kc-header-wrapper")
      .contains("Common Hosted Single Sign-on")
      .should("be.visible");
    cy.get("#social-idir").click();
  });

  // Validate siteminder and login
  cy.origin(
    siteminder || Cypress.env("siteminder"),
    { args: sentArgs },
    ({ user, pass }) => {
      cy.get("#login-to").contains("Log in to ").should("be.visible");
      cy.get("#user").type(user || Cypress.env("username"));
      cy.get("#password").type(pass || Cypress.env("password"));
      cy.get("input[name=btnSubmit]").click();
      cy.wait(3000);
    }
  );

  cy.log("Logged in as " + (username || Cypress.env("username")));
});

Cypress.Commands.add("logout", (host) => {
  // Check if you are on page with log out and logout
  cy.wait(3000);
  cy.get("h1")
    .contains("Common Hosted Single Sign-on (CSS)")
    .should("be.visible");
  cy.get("button").contains("Log out").click();

  // Retrun to home page
  cy.visit(host || Cypress.env("host"));

  cy.log("Logged out");
});
