class RequestPage {
    path: string = "/sso-requests-sandbox/request"

    projectName: string = "#root_projectName";
    teamId: string = "#root_teamId";
    publicAccess: string = "#root_publicAccess-Public";
    confidentialAccess: string = "#root_publicAccess-Confidential";
    identityProvider: string = "#root_devIdps_0";
    redirectUri: string = "#root_devValidRedirectUris_0";
    agreeTerms: string = "#root_agreeWithTerms";
    confirmDeleteModal: string = "#confirmation-modal";
    confirmDeleteButton: string = '[data-testid="confirm-delete"]';
    integrationsTable: string = 'table[role="table"] > tbody > tr > td:nth-child(1)';
    editButton: string = '[data-icon="pen-to-square"]';
    deleteButton: string = '[data-testid="action-button-delete"]';
    confirmDeleteInt: string = '[data-testid="confirm-delete"]';
    confirmDeleteIntModal: string = '#delete-modal-8885';

    confirmDelete() {
        cy.get(this.confirmDeleteModal)
        .find(this.confirmDeleteButton)
        .click();
    }

    confirmDeleteIntegration() {
        cy.get(this.confirmDeleteModal)
        .find(this.confirmDeleteInt)
        .click();
    }

    submitRequest() {
        cy.get("button").contains("Submit").click();
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
    agreeWithTerms() {
        cy.get(this.agreeTerms).check();
    }

    startRequest() {
        cy.get("button").contains("+ Request SSO Integration").click();
    }
    setTeamYes() {
        cy.get('[type="radio"]').first().check();
    }   
    setTeamNo() {
        cy.get('[type="radio"]').last().check();
    }

    page1Next() {
        cy.get('button[type="submit"]').contains("Next").click();
    }
    pageNext() {
        cy.get('button').contains("Next").click();
    }

    setPublicAccessYes() {
        cy.get(this.publicAccess).check();
    }
    setPublicAccessNo() {
        cy.get(this.confidentialAccess).check();
    }
    setIdentityProvider() {
        cy.get(this.identityProvider).check();
    }
  } 
  
  export default RequestPage;