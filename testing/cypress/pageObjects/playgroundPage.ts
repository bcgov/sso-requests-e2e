class PlaygroundPage {
  path: string = 'https://bcgov.github.io/keycloak-example-apps/';

  authServerUrl: string = 'input[name="url"]';
  realm: string = 'input[name="realm"]';
  clientId: string = 'input[name="clientId"]';
  commonButton: string = 'button';

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
    cy.contains(this.commonButton, 'Update', { timeout: 10000 }).click();
  }

  clickLogin() {
    cy.contains(this.commonButton, 'Login', { timeout: 10000 }).click();
  }

  clickLogout() {
    cy.contains(this.commonButton, 'Logout', { timeout: 10000 }).click();
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
    cy.get('#login-to', { timeout: 20000 }).contains('Log in to sfstest7.gov.bc.ca');
    cy.contains('div', 'Use a Basic BCeID').should('be.visible');
    cy.get('#user').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]', { timeout: 20000 }).click();
  }

  loginBusinesBCeID(username: string, password: string) {
    cy.get('#login-to', { timeout: 20000 }).contains('Log in to sfstest7.gov.bc.ca');
    cy.contains('div', 'Use a Business BCeID').should('be.visible');
    cy.get('#user').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]', { timeout: 20000 }).click();
    // Continue
    cy.get('input[type="submit"]', { timeout: 20000 }).click();
  }

  loginGithubbcGov(username: string, password: string, token: string) {
    cy.contains('p', 'GitHub', { timeout: 20000 }).should('be.visible');
    cy.get('#login_field').type(username);
    cy.get('#password').type(password);
    cy.get('input[type="submit"]', { timeout: 20000 }).click();

    cy.get('#app_totp', { timeout: 10000 }).type(token);
    cy.contains('Verify').click();
  }
}

export default PlaygroundPage;
