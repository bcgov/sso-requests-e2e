// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../appActions/Request";
import RequestPage from "../pageObjects/requestPage";

describe("Navigate Request", function () {
  const req = new Request();
  const reqPage = new RequestPage();

  beforeEach(() => {
    cy.login(null, null, null, null);
    cy.get(reqPage.integrationsTable).first().as("$id"); // Get the first request ID in the table
    cy.visit("/my-dashboard/integrations");
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Navigate Request", function () {

    cy.get(reqPage.integrationsTable).first().click();
    cy.get("div").contains("INTEGRATION DETAILS - ").should("be.visible");

    req.id = this.$id.text();
    cy.log("Found Request ID: " + req.id);

    cy.get(reqPage.tabTechDetails).click();
    cy.get("div").contains("Installation JSONs").should("be.visible");

    cy.get(reqPage.tabRoleManagement).click();
    cy.get("button").contains("+ Create a New Role").should("be.visible");

    cy.get(reqPage.tabUserRoleManagement).click();
    cy.get('button[type="button"]').contains("Search").should("be.visible");

    cy.get(reqPage.tabHistory).click();
    cy.get("div").contains("No events found").should("be.visible");

    // Back to first Tab
    cy.get(reqPage.tabTechDetails).click();
    cy.get("div").contains("Installation JSONs").should("be.visible");
    cy.get("button").contains("Copy").should("be.visible");
    cy.get("button").contains("Download").should("be.visible");

    cy.get("button").contains("Copy").click();
    cy.get("aside").contains("Installation copied to clipboard");

    cy.get("button").contains("Download").focus().realClick();

    req.viewRequest(req.id);
    req.deleteRequest(req.id);
    
  });
});
