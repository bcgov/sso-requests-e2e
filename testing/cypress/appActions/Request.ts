import { faker } from "@faker-js/faker";
import RequestPage from "../pageObjects/requestPage";

class Request {
  reqPage = new RequestPage();

  id: string;
  projectName: string;
  teamId: string;
  redirectUri: string;

  createRequest() {
    this.reqPage.startRequest();
    this.reqPage.setProjectName(
      this.projectName || faker.company.catchPhrase()
    );
    this.reqPage.setTeamYes();
    this.reqPage.setTeamId(this.teamId || "2278");
    this.reqPage.page1Next();
    this.reqPage.setPublicAccessYes();
    this.reqPage.setIdentityProvider();
    this.reqPage.pageNext();
    this.reqPage.setRedirectUri(this.redirectUri || faker.internet.url());
    this.reqPage.pageNext();
    this.reqPage.agreeWithTerms();
    this.reqPage.pageNext();
    this.reqPage.submitRequest();
    this.reqPage.confirmDelete();
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

  deleteRequest(id: string) {
    // identify first column
    cy.get(this.reqPage.integrationsTable).each(($elm, index, $list) => {
      // text captured from column1
      let t = $elm.text();
      // matching criteria
      if (t.includes(id)) {
        cy.get(this.reqPage.deleteButton).eq(index).click();

        //this.reqPage.confirmDeleteIntegration();
      }
    });
    cy.get("h1").contains(
      "Editing Req ID: " + id + " - Enter requester information"
    );
  }

  viewRequest(id: string) {
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
}

export default Request;
