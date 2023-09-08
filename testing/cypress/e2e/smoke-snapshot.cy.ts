require("@cypress/snapshot").register();

// Take a snapshot/verify of the not logged in page
describe("Verify Snapshot Home Page, not logged in", () => {
  it("Not Logged in", () => {
    cy.visit(Cypress.env("host"));
    cy.get("div#__next").snapshot("Full Page - Not Logged In");
  });
});

// Take a snapshot/verify of the logged in page
describe("Verify Snapshot Home Page, logged in", () => {
  it("Logged in", () => {
    cy.login(null, null, null, null);
    cy.get("div#__next").snapshot("Full Page - Logged In");
    cy.logout(null);
    
  });
});
