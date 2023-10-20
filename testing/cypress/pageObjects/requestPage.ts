class RequestPage {
  path: string = "/my-dashboard/integrations";

  projectName: string = "#root_projectName";
  loginNameDev: string = "#root_devLoginTitle";
  loginNameTest: string = "#root_testLoginTitle";
  loginNameProd: string = "#root_prodLoginTitle";
  teamId: string = "#root_teamId";
  publicAccess: string = "#root_publicAccess-Public";
  confidentialAccess: string = "#root_publicAccess-Confidential";
  identityProvider: string = "#root_devIdps";
  additionalRoleAttribute: string = "#root_additionalRoleAttribute";
  redirectUri: string = "#root_devValidRedirectUris_0";
  redirectUriTest: string = "#root_testValidRedirectUris_0";
  redirectUriProd: string = "#root_prodValidRedirectUris_0";
  agreeWithTerms: string = "#root_agreeWithTerms";
  confirmModal: string = "#info-modal";
  confirmDeleteModal: string = "#confirmation-modal";
  confirmDeleteButton: string = '[data-testid="confirm-delete"]';
  integrationsTable: string =
    'table[role="table"] > tbody > tr > td:nth-child(1)';
  integrationsTableStatus: string =
    'table[role="table"] > tbody > tr > td:nth-child(3)';
  editButton: string = '[data-testid="action-button-edit"]';
  deleteButton: string = '[data-testid="action-button-delete"]';
  confirmDeleteInt: string = 'button[data-testid="confirm-delete"]';
  confirmDeleteIntModal: string = '[id^="delete-modal-"]';
  envDev: string = "#root_environments_0";
  envTest: string = "#root_environments_1";
  envProd: string = "#root_environments_2";
  tabTechDetails: string = "#rc-tabs-1-tab-tech-details";
  tabRoleManagement: string = "#rc-tabs-1-tab-role-management";
  tabUserRoleManagement: string = "#rc-tabs-1-tab-user-role-management";
  tabHistory: string = "#rc-tabs-1-tab-history";
  usesTeam: string = '#root_usesTeam [type="radio"]';
  usesDisplayHeaderDev: string = '#root_devDisplayHeaderTitle [type="radio"]';
  usesDisplayHeaderTest: string = '#root_testDisplayHeaderTitle [type="radio"]';
  usesDisplayHeaderProd: string = '#root_prodDisplayHeaderTitle [type="radio"]';
  projectLead: string = '#root_projectLead [type="radio"]';
  requestIntegration: string = '[data-testid="request-integration"]';
  clientProtocol: string = '#root_protocol [type="radio"]';
  root_authType: string = '#root_authType [type="radio"]';

  // In info modal, click close button
  confirmClose() {
    cy.get(this.confirmModal).find(this.confirmDeleteButton).click();
  }

  confirmDelete(confirm: Boolean) {
    if (confirm) {
      cy.get(this.confirmDeleteModal).find(this.confirmDeleteButton).click();
    }
  }

  confirmDeleteIntegration(id: string) {
    cy.get("#delete-modal-" + Number(id)).then(($modal) => {
      cy.wrap($modal)
        .find(this.confirmDeleteInt)
        .contains("Delete")
        .click({ force: true });
    });
  }

  submitRequest(submit: Boolean) {
    if (submit) {
      cy.get("button").contains("Submit").click();
    }
  }

  updateRequest(update: Boolean) {
    if (update) {
      cy.get("button").contains("Update").click();
    }
  }

  setProjectName(projName: string) {
    cy.get(this.projectName).type(projName);
  }

  setClientProtocol(protocol: string) {
    cy.get(this.clientProtocol + '[value="' + protocol + '"]').check();
  }

  setAuthType(type: string) {
    cy.get(this.root_authType + '[value="' + type + '"]').check();
  }

  setLoginNameDev(logName: string) {
    cy.get(this.loginNameDev).clear();
    cy.get(this.loginNameDev).type(logName);
  }

  setLoginNameTest(logName: string) {
    cy.get(this.loginNameTest).clear();
    cy.get(this.loginNameTest).type(logName);
  }

  setLoginNameProd(logName: string) {
    cy.get(this.loginNameProd).clear();
    cy.get(this.loginNameProd).type(logName);
  }

  setEnvironment(env: string[]) {
    // Clean current settings
    cy.get(this.envTest).uncheck();
    cy.get(this.envProd).uncheck();

    if (env.includes("test")) {
      cy.get(this.envTest).check();
    }
    if (env.includes("prod")) {
      cy.get(this.envProd).check();
    }
    if (env.includes("dev")) {
      // Dev is default so no action required
    }
  }

  setTeamId(teamId: string) {
    cy.get(this.teamId).select(teamId);
  }

  setRedirectUri(redUri: string) {
    cy.get(this.redirectUri).type(redUri);
  }

  setRedirectUriTest(redUri: string) {
    cy.get(this.redirectUriTest).type(redUri);
  }

  setRedirectUriProd(redUri: string) {
    cy.get(this.redirectUriProd).type(redUri);
  }

  agreeWithTrms(agreeWithTerms: boolean) {
    if (agreeWithTerms) {
      cy.get(this.agreeWithTerms).check();
    }
  }

  startRequest() {
    cy.visit("/my-dashboard");
    cy.get(this.requestIntegration).click();
  }

  setTeam(team: boolean) {
    if (team) {
      cy.get(this.usesTeam).check("true");
    } else {
      cy.get(this.usesTeam).check("false");
    }
  }

  setHeaderTitleDev(header: boolean) {
    if (header) {
      cy.get(this.usesDisplayHeaderDev).check("true");
    } else {
      cy.get(this.usesDisplayHeaderDev).check("false");
    }
  }

  setHeaderTitleTest(header: boolean) {
    if (header) {
      cy.get(this.usesDisplayHeaderTest).check("true");
    } else {
      cy.get(this.usesDisplayHeaderTest).check("false");
    }
  }

  setHeaderTitleProd(header: boolean) {
    if (header) {
      cy.get(this.usesDisplayHeaderProd).check("true");
    } else {
      cy.get(this.usesDisplayHeaderProd).check("false");
    }
  }

  setProjectLead(lead: boolean) {
    if (lead) {
      cy.get(this.projectLead).check("true");
    } else {
      cy.get(this.projectLead).check("false");
    }
  }

  pageNext() {
    cy.get("button").contains("Next").click();
  }

  setPublicAccess(publicAccess: boolean) {
    if (publicAccess) {
      cy.get(this.publicAccess).check();
    } else {
      cy.get(this.confidentialAccess).check();
    }
  }

  setIdentityProvider(identityProvider: string[]) {
    // Clean current settings
    cy.get("#root_devIdps_0").uncheck();
    cy.get("#root_devIdps_1").uncheck();
    cy.get("#root_devIdps_2").uncheck();
    cy.get("#root_devIdps_3").uncheck();
    cy.get("#root_devIdps_4").uncheck();
    cy.get("#root_devIdps_6").uncheck();
    cy.wait(2000);

    if (identityProvider.includes("IDIR")) {
      cy.get("#root_devIdps_0").check();
    }
    if (identityProvider.includes("Azure IDIR")) {
      cy.get("#root_devIdps_1").check();
    }
    if (identityProvider.includes("Basic BCeID")) {
      cy.get("#root_devIdps_2").check();
    }
    if (identityProvider.includes("Business BCeID")) {
      cy.get("#root_devIdps_3").check();
    }
    if (identityProvider.includes("Basic or Business BCeID")) {
      cy.get("#root_devIdps_4").check();
    }
    // GitHub is not available in dev
    if (identityProvider.includes("GitHub")) {
      cy.get("#root_devIdps_5").check();
    }
    if (identityProvider.includes("GitHub BC Gov")) {
      cy.get("#root_devIdps_6").check();
    }
  }

  setadditionalRoleAttribute(additionalRoleAttribute: string) {
    if (additionalRoleAttribute) {
      cy.get(this.additionalRoleAttribute).type(additionalRoleAttribute);
    }
  }

  getFirstRequestID(): string {
    let id: string;
    cy.get(this.integrationsTable)
      .first()
      .then(($id) => {
        id = $id.text();
      });
    return id;
  }
}

export default RequestPage;