import path from 'path';
import Utilities from '../appActions/Utilities';
let util = new Utilities();

describe('SAML Spec', () => {
  it('Gets Configuration', () => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    cy.contains('td', '00010968').parent().click();
    cy.wait(1000);
    cy.get('#rc-tabs-1-tab-tech-details').click();
    cy.get('div').contains('Installation JSONs').should('be.visible');
    cy.get('button').contains('Download').should('be.visible');
    cy.get('button').contains('Download').focus().realClick();
    cy.logout(null);
  });

  it('Applies Config and Test', () => {
    const downloadsFolder = Cypress.config('downloadsFolder');
    const filePath = path.join(downloadsFolder, 'SAML Test 1-installation-dev.json');

    if (cy.setid('default')) {
      cy.readFile(filePath)
        .should('exist')
        .then((content) => {
          const jsonData = content;
          // Extracting the properties into variables
          const singleSignOnServiceURL = jsonData['Single Sign-On Service URL'];
          const singleLogoutServiceURL = jsonData['Single Logout Service URL'];
          const serviceProviderEntityID = jsonData['Service Provider Entity ID'];
          const x509Certificate = jsonData['X.509 Certificate'];

          cy.visit('http://localhost:8080');
          cy.get('#signOnUrl', { timeout: 10000 }).clear().type(singleSignOnServiceURL);
          cy.get('#logoutUrl', { timeout: 10000 }).clear().type(singleLogoutServiceURL);
          cy.get('#entityId', { timeout: 10000 }).clear().type(serviceProviderEntityID, { log: false });
          cy.get('#x509Cert', { timeout: 10000 }).clear().type(x509Certificate, { log: false });
          cy.get('button[type="submit"]').click();

          const sentArgs = { user: Cypress.env('username'), pass: Cypress.env('password') };
          cy.origin(Cypress.env('siteminder'), { args: sentArgs }, ({ user, pass }) => {
            cy.get('#login-to').contains('Log in to ').should('be.visible');
            cy.get('#user').type(user);
            cy.get('#password').type(pass, { log: false });
            cy.get('input[name=btnSubmit]').click();
            cy.wait(1000);
          });
        });
      cy.get('#myTabContent').within(() => {
        cy.get('#assertions-tab-pane').within(() => {
          cy.contains('td', 'family_name').siblings().contains('SSO Training').should('be.visible');
        });
      });
      cy.get('a[role="button"]', { timeout: 10000 }).contains('Logout').click();
    }
  });
});
