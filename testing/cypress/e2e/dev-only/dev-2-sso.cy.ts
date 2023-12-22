describe('SSO', () => {
  it('Login A', () => {
    cy.visit('https://bcgov.github.io/keycloak-example-apps/');
    cy.get('div.title').contains('Keycloak OIDC Config').click();
    cy.get('input[name="url"]').clear().type('https://dev.sandbox.loginproxy.gov.bc.ca/auth');
    cy.get('input[name="clientId"]').clear().type('single-sign-on-test-1-a-10482');
    cy.get('button[type="submit"]').contains('Update').click();
    cy.wait(1000);
    cy.get('input[name="clientId"]').should('have.value', 'single-sign-on-test-1-a-10482');
    cy.get('input[name="url"]').should('have.value', 'https://dev.sandbox.loginproxy.gov.bc.ca/auth');
    cy.wait(1000);
    cy.get('button').contains('Login').click();

    /*      cy.get('#social-idir').click();
      cy.get('#login-to').contains('Log in to ').should('be.visible'); */
    cy.get('#user').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'), { log: false });
    cy.get('input[name=btnSubmit]').click();
    cy.wait(3000);
    cy.get('a').contains('Token Parsed').click();
    cy.wait(2000);
    cy.contains('td', 'identity_provider').siblings().should('contain', 'idir');
  });

  it('Login B', () => {
    cy.visit('https://bcgov.github.io/keycloak-example-apps/');
    cy.get('div.title').contains('Keycloak OIDC Config').click();
    cy.get('input[name="url"]').clear().type('https://dev.sandbox.loginproxy.gov.bc.ca/auth');
    cy.get('input[name="clientId"]').clear().type('single-sign-on-test-1-b-10483');
    cy.get('button[type="submit"]').contains('Update').click();
    cy.wait(1000);
    cy.get('input[name="clientId"]').should('have.value', 'single-sign-on-test-1-b-10483');
    cy.get('input[name="url"]').should('have.value', 'https://dev.sandbox.loginproxy.gov.bc.ca/auth');
    cy.wait(1000);
    cy.get('button').contains('Login').click();

    cy.get('#user').type('D_PSSO_BasicBCeID');
    cy.get('#password').type('Password1234!', { log: false });
    cy.get('input[name=btnSubmit]').click();
    cy.get('input[type="submit"]').contains('Continue').click();
    cy.wait(3000);
    cy.get('a').contains('Token Parsed').click();
    cy.wait(2000);
    cy.contains('td', 'identity_provider').siblings().should('contain', 'bceidbasic');
  });
});
