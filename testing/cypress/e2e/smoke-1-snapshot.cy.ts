// This spec is used to take a snapshot of the home page, both logged in and not logged in. This is used to verify that the home page is not broken.
// This spec is also used to verify that the home page is not broken after a change is made to the home page.
// This spec is also used to verify that the home page is not broken after a change is made to the header or footer.
// It will detect major changes to the page. Therefore it will act at the proverbial canary in the coal mine.
// It is suggested to run this spec first before running any other spec. Hence the naming convention of smoke-1-snapshot.cy.ts.

// This spec does nee the following plugin, this plugin contains some outdated libraries, but it is still useful.
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
