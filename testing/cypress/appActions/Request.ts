import { faker } from "@faker-js/faker";
import RequestPage from "../pageObjects/requestPage";

class Request {
  reqPage = new RequestPage();

  // Page Element Definitions
  id: string;
  projectName: string;
  team: boolean;
  teamId: string;
  publicAccess: boolean;
  identityProvider: string;
  additionalRoleAttribute: string;
  redirectUri: string;
  agreeTerms: boolean;
  identityProvide: boolean;
  conFirm: boolean;
  subMit: boolean;

  // Actions
  createRequest() {
    this.reqPage.startRequest();
    this.reqPage.setProjectName(
      this.projectName || faker.company.catchPhrase()
    );
    this.reqPage.setTeam(this.team);
    this.reqPage.setTeamId(this.teamId);
    this.reqPage.page1Next();

    this.reqPage.setPublicAccess(this.publicAccess);
    this.reqPage.setIdentityProvider(this.identityProvider || "IDIR");
    this.reqPage.setadditionalRoleAttribute(this.additionalRoleAttribute);
    this.reqPage.pageNext();

    this.reqPage.setRedirectUri(this.redirectUri || faker.internet.url());
    this.reqPage.pageNext();

    this.reqPage.agreeWithTerms(this.agreeTerms);
    this.reqPage.pageNext();

    this.reqPage.submitRequest(this.subMit);
    this.reqPage.confirmDelete(this.conFirm);

    // Get the ID of the request just created make it available to the class
    // and write it to a file, so that it can be deleted later.
    cy.get(this.reqPage.integrationsTable)
      .first()
      .then(($id) => {
        this.id = $id.text();
        cy.log("Request ID: " + this.id);
        cy.readFile("cypress/fixtures/createdRequest.json").then((data) => {
          data.push(this.id);
          cy.writeFile("cypress/fixtures/createdRequest.json", data);
        });
      });
  }

  updateRequest(id: string) {
    // identify first column
    cy.get(this.reqPage.integrationsTable).each(($elm, index, $list) => {
      // text captured from column1
      let t = $elm.text();
      // matching criteria
      if (t.includes(id)) {
        cy.get(this.reqPage.editButton).eq(index).click();
        cy.log(index.toString());
      }
    });
    cy.get("h1").contains(
      "Editing Req ID: " + id + " - Enter requester information"
    );
  }

  deleteRequest(id: string): boolean {
    cy.log("Delete Request: " + id);
    // identify first column
    cy.get(this.reqPage.integrationsTable).each(($elm, index) => {
      // text captured from column1
      let t = $elm.text();
      // matching criteria
      if (t.includes(id)) {
        cy.get(this.reqPage.integrationsTableStatus)
          .eq(index)
          .then(($status) => {
            cy.log($status.text());
            if ($status.text().includes("Completed")) {
              cy.get(this.reqPage.deleteButton).eq(index).click();
              cy.wait(3000);
              this.reqPage.confirmDeleteIntegration();
            } else {
              cy.log("Request is not in Completed status.  Cannot delete.");
              return false;
            }
          });
        cy.log(id.toString());
      }
    });
    return true;
  }

  viewRequest(id: string) {
    cy.log("View Request: " + id);
    // identify first column
    cy.get(this.reqPage.integrationsTable).each(($elm, index, $list) => {
      // text captured from column1
      let t = $elm.text();
      // matching criteria
      if (t.includes(id)) {
        cy.get(this.reqPage.integrationsTableStatus)
          .eq(index)
          .then(($status) => {
            cy.log($status.text());
            if ($status.text().includes("Completed")) {
              cy.get(this.reqPage.editButton).eq(index).click();
            } else {
              cy.log("Request is not in Completed status.  Cannot view/edit.");
              return;
            }
          });
        cy.log(index.toString());
      }
    });
    cy.get("h1").contains(
      "Editing Req ID: " + id + " - Enter requester information"
    );
  }
}

export default Request;
