class RequestPage {
  path: string = "/sso-requests-sandbox/request";

  projectName: string = "#root_projectName";
  teamId: string = "#root_teamId";
  publicAccess: string = "#root_publicAccess-Public";
  confidentialAccess: string = "#root_publicAccess-Confidential";
  identityProvider: string = "#root_devIdps";
  additionalRoleAttribute: string = "#root_additionalRoleAttribute";
  redirectUri: string = "#root_devValidRedirectUris_0";
  agreeTerms: string = "#root_agreeWithTerms";
  confirmDeleteModal: string = "#confirmation-modal";
  confirmDeleteButton: string = '[data-testid="confirm-delete"]';
  integrationsTable: string =
    'table[role="table"] > tbody > tr > td:nth-child(1)';
  integrationsTableStatus: string =
    'table[role="table"] > tbody > tr > td:nth-child(3)';
  editButton: string = '[data-icon="pen-to-square"]';
  deleteButton: string = '[data-testid="action-button-delete"]';
  confirmDeleteInt: string = 'button[data-testid="confirm-delete"]';
  confirmDeleteIntModal: string = '[id^="delete-modal-"]';

  confirmDelete(confirm: Boolean) {
    if (confirm) {
      cy.get(this.confirmDeleteModal).find(this.confirmDeleteButton).click();
    }
  }
  //todo: Set a new testid for the modal
  confirmDeleteIntegration() {
    cy.get(this.confirmDeleteIntModal)
      .eq(0)
      .then(($modal) => {
        cy.wrap($modal).find(this.confirmDeleteInt).contains("Delete").click({ force: true });
      });
  }

  submitRequest(submit: Boolean) {
    if (submit) {
      cy.get("button").contains("Submit").click();
    }
  }

  setProjectName(projName: string) {
    cy.get(this.projectName).type(projName);
  }

  setTeamId(teamId: string) {
    cy.get(this.teamId).select(teamId);
  }
  setRedirectUri(redUri: string) {
    cy.get(this.redirectUri).type(redUri);
  }
  agreeWithTerms(agreeTerms: boolean) {
    if (agreeTerms) {
      cy.get(this.agreeTerms).check();
    }
  }

  startRequest() {
    cy.get("button").contains("+ Request SSO Integration").click();
  }

  setTeam(team: boolean) {
    if (team) {
      cy.get('[type="radio"]').first().check();
    } else {
      cy.get('[type="radio"]').last().check();
    }
  }

  page1Next() {
    cy.get('button[type="submit"]').contains("Next").click();
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

  setIdentityProvider(identityProvider: string) {
    let arr = [
      { id: "0", provider: "IDIR" },
      { id: "1", provider: "Azure IDIR" },
      { id: "2", provider: "Basic BCeID" },
      { id: "3", provider: "Business BCeID" },
      { id: "4", provider: "Basic or Business BCeID" },
      { id: "5", provider: "GitHub" }, //currently disabled
      { id: "6", provider: "GitHub BC Gov" },
    ];

    let obj = arr.find((o) => o.provider === identityProvider);

    cy.get("#root_devIdps_" + obj.id).click();
  }

  setadditionalRoleAttribute(additionalRoleAttribute: string) {
    if (additionalRoleAttribute) {
      cy.get(this.additionalRoleAttribute).type(additionalRoleAttribute);
    }
  }
}

export default RequestPage;
