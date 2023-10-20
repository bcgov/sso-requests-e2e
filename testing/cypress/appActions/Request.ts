import { faker } from "@faker-js/faker";
import RequestPage from "../pageObjects/requestPage";

class Request {
  reqPage = new RequestPage();

  identityProvider: string[];
  redirectUri: string;
  identityProvide: boolean;
  conFirm: boolean;
  subMit: boolean;

  id: string;
  idirUserid: string;
  projectName: string;
  clientId: string;
  clientName: string;
  realm: string;
  publicAccess: boolean;
  projectLead: boolean;
  newToSso: boolean;
  agreeWithTerms: boolean;
  protocol: string;
  authType: string;
  serviceType: string;
  apiServiceAccount: boolean;
  environments: string[];
  prNumber: number;
  actionNumber: number;
  hasUnreadNotifications: boolean;
  browserFlowOverride: string;
  additionalRoleAttribute: string;
  usesTeam: boolean;
  teamId: string;
  userId: number;
  team: any;
  user: any;
  devValidRedirectUris: string[];
  testValidRedirectUris: string[];
  prodValidRedirectUris: string[];
  devIdps: string[];
  testIdps: string[];
  prodIdps: string[];
  devRoles: string[];
  testRoles: string[];
  prodRoles: string[];
  devLoginTitle: string;
  testLoginTitle: string;
  prodLoginTitle: string;
  devAssertionLifespan: number;
  devAccessTokenLifespan: number;
  devSessionIdleTimeout: number;
  devSessionMaxLifespan: number;
  devOfflineSessionIdleTimeout: number;
  devOfflineSessionMaxLifespan: number;
  testAssertionLifespan: number;
  testAccessTokenLifespan: number;
  testSessionIdleTimeout: number;
  testSessionMaxLifespan: number;
  testOfflineSessionIdleTimeout: number;
  testOfflineSessionMaxLifespan: number;
  prodAssertionLifespan: number;
  prodAccessTokenLifespan: number;
  prodSessionIdleTimeout: number;
  prodSessionMaxLifespan: number;
  prodOfflineSessionIdleTimeout: number;
  prodOfflineSessionMaxLifespan: number;
  lastChanges: any[] | null;
  idirUserDisplayName: string;
  requester: string;
  status: string;
  bceidApproved: boolean;
  githubApproved: boolean;
  archived: boolean;
  provisioned: boolean;
  provisionedAt: string;
  createdAt: string;
  updatedAt: string;
  userTeamRole: string;
  devDisplayHeaderTitle: boolean;
  testDisplayHeaderTitle: boolean;
  prodDisplayHeaderTitle: boolean;
  devSamlLogoutPostBindingUri: string;
  testSamlLogoutPostBindingUri: string;
  prodSamlLogoutPostBindingUri: string;

  // Actions
  createRequest() {
    this.reqPage.startRequest();

    // Tab 1: Requester Info
    this.reqPage.setProjectName(
      this.projectName || faker.company.catchPhrase()
    );
    this.reqPage.setTeam(this.usesTeam);
    if (this.usesTeam) {
      this.reqPage.setTeamId(this.teamId);
    } else {
      this.reqPage.setProjectLead(this.projectLead);
      if (!this.projectLead) {
        this.reqPage.confirmClose();
        cy.visit("/my-dashboard"); // return to dashboard
        return;
      }
    }
    this.reqPage.pageNext();
    cy.wait(2000);

    // Tab 2: Basic Info
    this.reqPage.setClientProtocol(this.protocol);
    if (this.protocol === "oidc") {
      this.reqPage.setAuthType(this.authType);
      if (this.authType != "service-account") {
        if (this.authType != "both") {
          this.reqPage.setPublicAccess(this.publicAccess);
        }
        this.reqPage.setIdentityProvider(this.identityProvider);
      }
    } else {
      this.reqPage.setIdentityProvider(this.identityProvider);
    }

    this.reqPage.setEnvironment(this.environments);
    this.reqPage.setadditionalRoleAttribute(this.additionalRoleAttribute);
    cy.get("p").contains("Last saved at").wait(2000);
    this.reqPage.pageNext();

    // Tab 3: Development
    if (this.authType != "service-account") {
      this.reqPage.setLoginNameDev(this.devLoginTitle || this.projectName);
      this.reqPage.setHeaderTitleDev(this.devDisplayHeaderTitle || true);
      this.reqPage.setRedirectUri(
        this.devValidRedirectUris[0] || faker.internet.url()
      );
    }
    // todo: Add more than 1 URI
    cy.get("p").contains("Last saved at").wait(2000);
    this.reqPage.pageNext();

    // Tab 3: Test
    if (this.environments.includes("test")) {
      if (this.authType != "service-account") {
        this.reqPage.setLoginNameTest(this.testLoginTitle || this.projectName);
        this.reqPage.setHeaderTitleTest(this.testDisplayHeaderTitle || true);
        this.reqPage.setRedirectUriTest(
          this.testValidRedirectUris[0] || faker.internet.url()
        );
      }
      cy.get("p").contains("Last saved at").wait(2000);
      this.reqPage.pageNext();
    }

    // Tab 3: Production
    if (this.environments.includes("prod")) {
      if (this.authType != "service-account") {
        this.reqPage.setLoginNameProd(this.prodLoginTitle || this.projectName);
        this.reqPage.setHeaderTitleProd(this.prodDisplayHeaderTitle || true);
        this.reqPage.setRedirectUriProd(
          this.prodValidRedirectUris[0] || faker.internet.url()
        );
      }
      cy.get("p").contains("Last saved at").wait(2000);
      this.reqPage.pageNext();
    }

    this.reqPage.agreeWithTrms(this.agreeWithTerms);
    cy.get("p").contains("Last saved at").wait(2000);
    this.reqPage.pageNext();

    this.reqPage.submitRequest(this.subMit);
    this.reqPage.confirmDelete(this.conFirm);
    cy.wait(2000);

    // Get the ID of the request just created make it available to the class
    // and write it to a file, so that it can be deleted later.
    cy.get(this.reqPage.integrationsTable)
      .first()
      .then(($id) => {
        this.id = $id.text();
        Cypress.env("test", $id.text());
        cy.log("Request ID: " + this.id);
        cy.readFile("cypress/fixtures/createdRequest.json").then((data) => {
          data.push(this.id);
          cy.writeFile("cypress/fixtures/createdRequest.json", data);
        });
      });
  }

  updateRequest(id: string): boolean {
    cy.log("Update Request: " + id);
    cy.visit(this.reqPage.path);
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

    if (this.projectName) {
      cy.get(this.reqPage.projectName).focus().clear();
      this.reqPage.setProjectName(this.projectName);
    }
    if (this.team) {
      this.reqPage.setTeam(this.team);
    }
    if (this.teamId) {
      this.reqPage.setTeamId(this.teamId);
    }
    cy.wait(2000);
    this.reqPage.pageNext();

    if (this.publicAccess) {
      this.reqPage.setPublicAccess(this.publicAccess);
    }
    if (this.identityProvider[0] != "" ) {
      this.reqPage.setIdentityProvider(this.identityProvider);
    }
    if (this.additionalRoleAttribute) {
      this.reqPage.setadditionalRoleAttribute(this.additionalRoleAttribute);
    }
    cy.wait(2000);
    this.reqPage.pageNext();

    if (this.redirectUri) {
      this.reqPage.setRedirectUri(this.redirectUri);
    }
    cy.wait(2000);
    this.reqPage.pageNext();
  
    cy.get('div [data-testid="stage-5"]').click();
    cy.wait(2000);

    this.reqPage.updateRequest(this.subMit);
    this.reqPage.confirmDelete(this.conFirm);
    cy.wait(2000);

    return true;
  }

  deleteRequest(id: string) {
    cy.log("Delete Request: " + id);
    cy.visit(this.reqPage.path);
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

            // Wait for the request to complete before deleting
            while (!$status.text().includes("Completed")) {
              cy.wait(10000);
              cy.reload();
              cy.get(this.reqPage.integrationsTableStatus)
                .eq(index)
                .then(($status) => {
                  cy.log($status.text());
                });
            }
            if ($status.text().includes("Completed")) {
              cy.get(this.reqPage.deleteButton).eq(index).click();
              cy.wait(3000);
              this.reqPage.confirmDeleteIntegration(id);
              cy.log("Delete Request: " + id.toString());
            } else {
              cy.log("Request is not in Completed status.  Cannot delete.");
            }
          });
      }
    });
  }

  viewRequest(id: string): boolean {
    cy.log("View Request: " + id);
    cy.visit(this.reqPage.path);
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
              return false;
            }
          });
        cy.log(index.toString());
      }
    });
    cy.get("h1").contains(
      "Editing Req ID: " + id + " - Enter requester information"
    );

    // Tab 1
    cy.get('[data-testid="stage-1"]').click();
    cy.get('legend[data-testid="root_projectName_title"]').should("be.visible");
    cy.get("#root_projectName").should("be.visible");
    cy.get('legend[data-testid="root_usesTeam_title"]').should("be.visible");
    cy.get(this.reqPage.usesTeam).should("be.visible");
    cy.get("#root_teamId").should("be.visible");
    cy.get('legend[data-testid="root_usesTeam_title"]').should("be.visible");
    cy.get("label")
      .contains("Create a New Team (optional)")
      .should("be.visible");
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Cancel")
      .should("be.visible");
    cy.get("button").contains("Next").should("be.visible");
    cy.get("button").contains("Next").click();

    // Tab 2
    cy.get('[data-testid="stage-2"]').click();
    cy.get('legend[data-testid="root_protocol_title"]').should("be.visible");
    cy.get('legend[data-testid="root_authType_title"]').should("be.visible");
    cy.get('legend[data-testid="root_publicAccess_title"]').should(
      "be.visible"
    );
    cy.get('legend[data-testid="root_devIdps_title"]').should("be.visible");
    cy.get('legend[data-testid="root_environments_title"]').should(
      "be.visible"
    );
    cy.get('legend[data-testid="root_additionalRoleAttribute_title"]').should(
      "be.visible"
    );
    cy.get("#root_additionalRoleAttribute").should("be.visible");
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Cancel")
      .should("be.visible");
    cy.get("button").contains("Next").should("be.visible");
    cy.get("button").contains("Next").click();

    // Tab 3
    cy.get('[data-testid="stage-3"]').click();
    cy.get('legend[data-testid="root_devLoginTitle_title"]').should(
      "be.visible"
    );
    cy.get("#root_devLoginTitle").should("be.visible");
    cy.get('legend[data-testid="root_devDisplayHeaderTitle_title"]').should(
      "be.visible"
    );
    cy.get("#root_devDisplayHeaderTitle").should("be.visible");
    cy.get("legend").contains("Redirect URIs").should("be.visible");
    cy.get("#root_devValidRedirectUris_0").should("be.visible");
    cy.get("legend")
      .contains("Additional Settings (Optional)")
      .should("be.visible");
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Cancel")
      .should("be.visible");
    cy.get("button").contains("Next").should("be.visible");
    cy.get("button").contains("Next").click();

    // Tab 4
    cy.get('[data-testid="stage-4"]').click();
    cy.get("#root").should("be.visible");
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Update")
      .should("be.visible");
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Cancel")
      .should("be.visible");

    // Cancel Transaction
    cy.get('div[data-testid="form-btns"] > button[type="button"]')
      .contains("Cancel")
      .click();

    cy.visit("/my-dashboard"); // return to dashboard
    return true;
  }
}

export default Request;
