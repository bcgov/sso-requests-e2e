import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import RequestPage from "../pageObjects/requestPage";
const idpMap: any = {
  IDIR: "idir",
  "Azure IDIR": "azureidir",
  "Basic BCeID": "bceidbasic",
  "Business BCeID": "bceidbusiness",
  "Basic or Business BCeID": "bceidboth",
  "GitHub BC Gov": "githubbcgov",
  GitHub: "githubpublic",
};

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
  teamName: string;
  newteam: boolean;
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
      if (this.newteam) {
        this.createTeamfromRequest();
      } else {
        this.reqPage.setTeamName(this.teamName);
      }
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
      this.reqPage.setHeaderTitleDev(this.devDisplayHeaderTitle);
      this.setDevUri(this.devValidRedirectUris);
    }
    cy.get("p").contains("Last saved at").wait(2000);
    this.reqPage.pageNext();

    // Tab 3: Test
    if (this.environments.includes("test")) {
      if (this.authType != "service-account") {
        this.reqPage.setLoginNameTest(this.testLoginTitle || this.projectName);
        this.reqPage.setHeaderTitleTest(this.testDisplayHeaderTitle);
        this.setTestUri(this.testValidRedirectUris);
      }
      cy.get("p").contains("Last saved at").wait(2000);
      this.reqPage.pageNext();
    }

    // Tab 3: Production
    if (this.environments.includes("prod")) {
      if (this.authType != "service-account") {
        this.reqPage.setLoginNameProd(this.prodLoginTitle || this.projectName);
        this.reqPage.setHeaderTitleProd(this.prodDisplayHeaderTitle);
        this.setProdUri(this.prodValidRedirectUris);
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

  validateRequest(id: string): boolean {
    let n = 0;
    cy.log("Validate Request: " + id);
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

    // Goto the preview tab
    cy.get(this.reqPage.prev_Tab).click();
    cy.get("h1").contains("Review and Submit");

    if (this.usesTeam) {
      cy.get(this.reqPage.prev_AssociatedTeam).contains(this.teamName);
    }

    // TODO: Project Lead indicator, not yet tested for
    // cy.get(this.reqPage.prev_Accountable).contains();

    if (this.protocol === "oidc") {
      cy.get(this.reqPage.prev_clientProtocol).contains("OpenID Connect");
    } else {
      cy.get(this.reqPage.prev_clientProtocol).contains("SAML");
    }

    // Check Public or Confidential access, only when protocol is not SAML
    if (this.protocol !== "saml") {
      if (this.publicAccess == true) {
        cy.get(this.reqPage.prev_ClientTypeTeam).contains("Public");
      } else {
        cy.get(this.reqPage.prev_ClientTypeTeam).contains("Confidential");
      }
    }

    // Check the Auth Type/Use Case
    if (this.authType === "browser-login") {
      cy.get(this.reqPage.prev_UseCase).contains("Browser Login");
    } else if (this.authType === "service-account") {
      cy.get(this.reqPage.prev_UseCase).contains("Service Account");
    } else {
      if (this.authType !== "") {
        cy.get(this.reqPage.prev_UseCase).contains(
          "Browser Login & Service Account"
        );
      }
    }

    // Check the Project Name
    cy.get(this.reqPage.prev_ProjectName).contains(this.projectName);

    // Check the Additional Role Attribute
    if (this.additionalRoleAttribute) {
      cy.get(this.reqPage.prev_AddRoleAttribute).contains(
        this.additionalRoleAttribute
      );
    }

    // Check the identity providers
    if (this.identityProvider[0] !== "") {
      n = 0;
      while (n < this.identityProvider.length) {
        if (this.identityProvider[n] !== "") {
          cy.get(this.reqPage.prev_IdpRequired).contains(
            idpMap[this.identityProvider[n]]
          );
        }
        n++;
      }
    }

    // Check the redirect URIs per environment
    // Dev
    if (this.devValidRedirectUris[0] !== "") {
      n = 0;
      while (n < this.devValidRedirectUris.length) {
        if (this.devValidRedirectUris[n] !== "") {
          cy.get(this.reqPage.prev_DevUri).contains(
            this.devValidRedirectUris[n]
          );
        }
        n++;
      }
    }

    // Test
    if (this.testValidRedirectUris[0] !== "") {
      n = 0;
      while (n < this.testValidRedirectUris.length) {
        if (this.testValidRedirectUris[n] !== "") {
          cy.get(this.reqPage.prev_DevUri).contains(
            this.testValidRedirectUris[n]
          );
        }
        n++;
      }
    }

    // Prod
    if (this.prodValidRedirectUris[0] !== "") {
      n = 0;
      while (n < this.prodValidRedirectUris.length) {
        if (this.prodValidRedirectUris[n] !== "") {
          cy.get(this.reqPage.prev_DevUri).contains(
            this.prodValidRedirectUris[n]
          );
        }
        n++;
      }
    }

    // Back to the dashboard page
    cy.visit(this.reqPage.path);

    return true;
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

    // Tab 1: Requester Info
    if (this.projectName !== "") {
      this.reqPage.setProjectName(this.projectName);
    }
    if (this.reqPage.usesTeam) {
      if (this.teamName) {
        if (this.newteam) {
          this.createTeamfromRequest();
        } else {
          this.reqPage.setTeamName(this.teamName);
        }
      }
    } else {
      if (this.projectLead) {
        this.reqPage.setProjectLead(this.projectLead);
      } else {
        if (!this.projectLead) {
          this.reqPage.confirmClose();
          cy.visit("/my-dashboard"); // return to dashboard
          return false;
        }
      }
    }

    this.reqPage.pageNext();
    cy.wait(2000);

    // Tab 2: Basic Info

    if (this.protocol == "oidc") {
      if (this.publicAccess) {
        this.reqPage.setPublicAccess(this.publicAccess);
      }

      if (this.authType != "service-account") {
        if (this.identityProvider[0] !== "") {
          this.reqPage.setIdentityProvider(this.identityProvider);
        }
      }
      // TODO: deal with adding new environments
      /*     if (this.environments) {
      this.reqPage.setEnvironment(this.environments);
    } */
    }
    if (this.additionalRoleAttribute) {
      this.reqPage.setadditionalRoleAttribute(this.additionalRoleAttribute);
    }
    cy.wait(2000);
    this.reqPage.pageNext();

    // Tab 3: Development
    if (this.authType != "service-account") {
      if (this.devLoginTitle) {
        this.reqPage.setLoginNameDev(this.devLoginTitle);
      }
      if (this.devDisplayHeaderTitle) {
        this.reqPage.setHeaderTitleDev(this.devDisplayHeaderTitle);
      }
      if (this.devValidRedirectUris[0] !== "") {
        this.setDevUri(this.devValidRedirectUris);
      }
    }

    // todo: Add more than 1 URI
    cy.wait(2000);
    this.reqPage.pageNext();

    // Tab 3: Test
    if (this.environments.includes("test")) {
      if (this.authType != "service-account") {
        if (this.testLoginTitle) {
          this.reqPage.setLoginNameTest(
            this.testLoginTitle || this.projectName
          );
        }
        if (this.testDisplayHeaderTitle) {
          this.reqPage.setHeaderTitleTest(this.testDisplayHeaderTitle);
        }
        if (this.testValidRedirectUris[0] !== "") {
          this.setTestUri(this.testValidRedirectUris);
        }
        cy.wait(2000);
        this.reqPage.pageNext();
      }
    }

    // Tab 3: Production
    if (this.environments.includes("prod")) {
      if (this.authType != "service-account") {
        if (this.prodLoginTitle) {
          this.reqPage.setLoginNameProd(this.prodLoginTitle);
        }
        if (this.prodDisplayHeaderTitle) {
          this.reqPage.setHeaderTitleProd(this.prodDisplayHeaderTitle);
        }
        if (this.prodValidRedirectUris[0] !== "") {
          this.setProdUri(this.prodValidRedirectUris);
        }
      }
      cy.wait(2000);
      this.reqPage.pageNext();
    }

    cy.get(this.reqPage.stageReviewSubmit).click();
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

  // Tools
  showCreateContent(value: any) {
    cy.log("test_id: " + value.create[0].test_id);
    cy.log("projectname: " + value.create[0].projectname);
    cy.log("team: " + value.create[0].team);
    cy.log("teamname: " + value.create[0].teamname);
    cy.log("newteam: " + value.create[0].newteam);
    cy.log("publicaccess: " + value.create[0].publicaccess);
    cy.log("protocol: " + value.create[0].protocol);
    cy.log("authtype: " + value.create[0].authtype);
    cy.log("identityprovider: " + value.create[0].identityprovider);
    cy.log(
      "additionalroleattribute: " + value.create[0].additionalroleattribute
    );
    cy.log("redirecturi: " + value.create[0].redirecturi);
    cy.log("redirecturitest: " + value.create[0].redirecturitest);
    cy.log("redirecturiprod: " + value.create[0].redirecturiprod);
    cy.log("displayheader: " + value.create[0].displayheader);
    cy.log("displayheadertest: " + value.create[0].displayheadertest);
    cy.log("displayheaderprod: " + value.create[0].displayheaderprod);
    cy.log("ssoheaderdev: " + value.create[0].ssoheaderdev);
    cy.log("ssoheadertest: " + value.create[0].ssoheadertest);
    cy.log("ssoheaderprod: " + value.create[0].ssoheaderprod);
    cy.log("Environments: " + value.create[0].environments);
    cy.log("agreeWithTermstrue: " + value.create[0].agreeWithTermstrue);
    cy.log("submit: " + value.create[0].submit);
    cy.log("confirm: " + value.create[0].confirm);
    cy.log("description: " + value.create[0].description);
  }

  showUpdateContent(value: any) {
    cy.log("id: " + value.id);
    cy.log("test_id: " + value.update[0].test_id);
    cy.log("projectname: " + value.update[0].projectname);
    cy.log("team: " + value.update[0].team);
    cy.log("teamname: " + value.update[0].teamname);
    cy.log("newteam: " + value.create[0].newteam);
    cy.log("publicaccess: " + value.update[0].publicaccess);
    cy.log("protocol: " + value.update[0].protocol);
    cy.log("authtype: " + value.update[0].authtype);
    cy.log("identityprovider: " + value.update[0].identityprovider);
    cy.log(
      "additionalroleattribute: " + value.update[0].additionalroleattribute
    );
    cy.log("redirecturi: " + value.update[0].redirecturi);
    cy.log("redirecturitest: " + value.update[0].redirecturitest);
    cy.log("redirecturiprod: " + value.update[0].redirecturiprod);
    cy.log("displayheader: " + value.update[0].displayheader);
    cy.log("displayheadertest: " + value.update[0].displayheadertest);
    cy.log("displayheaderprod: " + value.update[0].displayheaderprod);
    cy.log("ssoheaderdev: " + value.create[0].ssoheaderdev);
    cy.log("ssoheadertest: " + value.create[0].ssoheadertest);
    cy.log("ssoheaderprod: " + value.create[0].ssoheaderprod);
    cy.log("Environments: " + value.update[0].environments);
  }

  populateCreateContent(value: any) {
    this.id = value.id;
    this.projectName = value.create[0].projectname; // faker.company.catchPhrase(); when no value is supplied
    this.usesTeam = value.create[0].team;
    this.teamName = value.create[0].teamname;
    this.newteam = value.create[0].newteam;
    this.projectLead = value.create[0].projectlead;
    this.publicAccess = value.create[0].publicaccess;
    this.protocol = value.create[0].protocol;
    this.authType = value.create[0].authtype;
    this.identityProvider = value.create[0].identityprovider;
    this.additionalRoleAttribute = value.create[0].additionalroleattribute;
    this.devValidRedirectUris = value.create[0].redirecturi;
    this.testValidRedirectUris = value.create[0].redirecturitest;
    this.prodValidRedirectUris = value.create[0].redirecturiprod;
    this.devDisplayHeaderTitle = value.create[0].displayheader;
    this.testDisplayHeaderTitle = value.create[0].displayheadertest;
    this.prodDisplayHeaderTitle = value.create[0].displayheaderprod;
    this.devLoginTitle = value.create[0].ssoheaderdev;
    this.testLoginTitle = value.create[0].ssoheadertest;
    this.prodLoginTitle = value.create[0].ssoheaderprod;
    this.environments = value.create[0].environments;
    this.agreeWithTerms = value.create[0].agreeWithTermstrue;
    this.subMit = value.create[0].submit;
    this.conFirm = value.create[0].confirm;
  }
  showPopulatedContent() {
    cy.log("this.id: " + this.id);
    cy.log("this.projectName: " + this.projectName);
    cy.log("this.usesTeam: " + this.usesTeam);
    cy.log("this.teamName: " + this.teamName);
    cy.log("this.newteam: " + this.newteam);
    cy.log("this.projectLead: " + this.projectLead);
    cy.log("this.publicAccess: " + this.publicAccess);
    cy.log("this.protocol: " + this.protocol);
    cy.log("this.authType: " + this.authType);
    cy.log("this.identityProvider: " + this.identityProvider);
    cy.log("this.additionalRoleAttribute: " + this.additionalRoleAttribute);
    cy.log("this.devValidRedirectUris: " + this.devValidRedirectUris);
    cy.log("this.testValidRedirectUris: " + this.testValidRedirectUris);
    cy.log("this.prodValidRedirectUris: " + this.prodValidRedirectUris);
    cy.log("this.devDisplayHeaderTitle: " + this.devDisplayHeaderTitle);
    cy.log("this.testDisplayHeaderTitle: " + this.testDisplayHeaderTitle);
    cy.log("this.prodDisplayHeaderTitle: " + this.prodDisplayHeaderTitle);
    cy.log("this.devLoginTitle: " + this.devLoginTitle);
    cy.log("this.testLoginTitle: " + this.testLoginTitle);
    cy.log("this.prodLoginTitle: " + this.prodLoginTitle);
    cy.log("this.environments: " + this.environments);
    cy.log("this.agreeWithTerms: " + this.agreeWithTerms);
    cy.log("this.subMit: " + this.subMit);
    cy.log("this.conFirm: " + this.conFirm);
  }

  populateUpdateContent(value: any) {
    this.id = value.id;
    this.projectName = value.update[0].projectname;
    this.usesTeam = value.update[0].team;
    this.teamName = value.update[0].teamname;
    this.newteam = value.update[0].newteam;
    this.projectLead = value.update[0].projectlead;
    this.publicAccess = value.update[0].publicaccess;
    this.protocol = value.create[0].protocol; // unchangeable so we capture the set value
    this.authType = value.create[0].authtype; // unchangeable so we capture the set value
    this.identityProvider = value.update[0].identityprovider;
    this.additionalRoleAttribute = value.update[0].additionalroleattribute;
    this.devValidRedirectUris = value.update[0].redirecturi;
    this.testValidRedirectUris = value.update[0].redirecturitest;
    this.prodValidRedirectUris = value.update[0].redirecturiprod;
    this.devDisplayHeaderTitle = value.update[0].displayheader;
    this.testDisplayHeaderTitle = value.update[0].displayheadertest;
    this.prodDisplayHeaderTitle = value.update[0].displayheaderprod;
    this.devLoginTitle = value.update[0].ssoheaderdev;
    this.testLoginTitle = value.update[0].ssoheadertest;
    this.prodLoginTitle = value.update[0].ssoheaderprod;
    this.environments = value.create[0].environments;
    this.subMit = value.create[0].submit;
    this.conFirm = value.create[0].confirm;
  }

  createTeamfromRequest() {
    cy.get("#root > div > svg").click({ force: true });
    cy.get("#create-team-modal")
      .should("be.visible")
      .then(() => {
        let myuuid = uuidv4();
        cy.log("Team Name: " + this.teamName);
        cy.get('[data-testid="team-name"]')
          .clear()
          .type(this.teamName + "-" + myuuid);
        cy.realPress("Tab");
        cy.realPress("Tab");
        cy.realPress("Tab");
        cy.focused().type("roland.stens@gov.bc.ca");
        cy.realPress("Tab");
        cy.focused().select("Admin");
        cy.get('[data-testid="send-invitation"]').click({ force: true });
      });
  }

  setDevUri(tempUri: string[]) {
    let n = 0;
    while (tempUri.length > n) {
      if (n > 0) {
        cy.get('[data-testid="add-uri"]').click({ force: true });
      }
      cy.get("#root_devValidRedirectUris_" + n.toString()).clear();
      cy.get("#root_devValidRedirectUris_" + n.toString()).type(tempUri[n]);
      n++;
    }
  }
  setTestUri(tempUri: string[]) {
    let n = 0;
    while (tempUri.length > n) {
      if (n > 0) {
        cy.get('[data-testid="add-uri"]').click({ force: true });
      }
      cy.get("#root_testValidRedirectUris_" + n.toString()).clear();
      cy.get("#root_testValidRedirectUris_" + n.toString()).type(tempUri[n]);
      n++;
    }
  }
  setProdUri(tempUri: string[]) {
    let n = 0;
    while (tempUri.length > n) {
      if (n > 0) {
        cy.get('[data-testid="add-uri"]').click({ force: true });
      }
      cy.get("#root_prodValidRedirectUris_" + n.toString()).clear();
      cy.get("#root_prodValidRedirectUris_" + n.toString()).type(tempUri[n]);
      n++;
    }
  }
}

export default Request;
