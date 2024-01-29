class PlaygroundPage {
  path: string = 'https://bcgov.github.io/keycloak-example-apps/';

  authServerUrl: string = 'input[name="url"]';
  realm: string = 'input[name="realm"]';
  clientId: string = 'input[name="clientId"]';
  updateButton: string = 'button';

  selectConfig() {
    cy.get('div').contains('Keycloak OIDC Config').click({ force: true });
  }

  setAuthServerUrl(url: string) {
    cy.get(this.authServerUrl)
      .clear()
      .type(url + '{enter}');
  }

  setRealm(realm: string) {
    cy.get(this.realm)
      .clear()
      .type(realm + '{enter}');
  }

  setClientId(clientId: string) {
    cy.get(this.clientId)
      .clear()
      .type(clientId + '{enter}');
  }

  clickUpdate() {
    cy.get(this.updateButton).contains('Update').click();
  }

  clickLogin() {
    cy.get(this.updateButton).contains('Login').click();
  }

  clickLogout() {
    cy.get(this.updateButton).contains('Logout').click();
  }

  checkProviders(providers: string[]) {
    if (providers.length > 1) {
      // On the IDP Select Page, select/test the IDP
      cy.get('#kc-social-providers').within(() => {
        let n = 0;
        while (n < providers.length) {
          if (providers[n] !== '') {
            cy.contains('li', providers[n]);
          }
          n++;
        }
      });
    }
  }

  loginBasicBCeID(username: string, password: string) {
    cy.get('#login-to', { timeout: 10000 }).contains('Log in to sfstest7.gov.bc.ca');
    cy.contains('div', 'Use a Basic BCeID').should('be.visible');
    cy.get('#user').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]').click();
  }

  loginBusinesBCeID(username: string, password: string) {
    cy.get('#login-to', { timeout: 10000 }).contains('Log in to sfstest7.gov.bc.ca');
    cy.contains('div', 'Use a Business BCeID').should('be.visible');
    cy.get('#user').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]').click();
  }

  loginGithubbcGov(username: string, password: string) {
    cy.contains('p', 'GitHub').should('be.visible');
    cy.get('#login_field').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]').click();
  }
}

export default PlaygroundPage;
