import "cypress-plugin-api";
import "cypress-real-events";
import HomePage from "../pageObjects/homePage";

Cypress.Commands.add("querySelectorIncludesText", (selector, text) => {
  return cy.wrap(
    Array.from(document.querySelectorAll(selector)).find((el) =>
      el.textContent.includes(text)
    )
  );
});


Cypress.Commands.add("login", (username, password, host, siteminder) => {
  const home = new HomePage();

  // Go to the host
  cy.visit(host || Cypress.env("host"));

  const sentArgs = { user: username, pass: password };

  // Validate the host
  cy.get("h1")
    .contains("Common Hosted Single Sign-on (CSS)")
    .should("be.visible");

  // Click the login button
  home.clickLoginButton();

  // Validate the login proxy only when we are not targeting a local install
  if (Cypress.env("host") != "http://localhost:30000") {
    cy.origin(Cypress.env("loginproxy"), () => {
      cy.get("#kc-header-wrapper")
        .contains("Common Hosted Single Sign-on")
        .should("be.visible");
      cy.get("#social-idir").click();
    });
  }

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

Cypress.Commands.add("assertValueCopiedToClipboard", (value) => {
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      expect(text).to.eq(value);
    });
  });
});

/* Generate a UUID
 *
 * @returns {string} A UUID
 * Usage:
 * cy.generateUUID().then((uuid) => {
 *    cy.log(uuid);
 *  });
 *
 */
Cypress.Commands.add("generateUUID", (): Cypress.Chainable<string> => {
  return cy.wrap(
    "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: string) => {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
      const v = parseInt(c, 10) ^ (r >> (parseInt(c, 10) / 4));
      return v.toString(16);
    })
  );
});
