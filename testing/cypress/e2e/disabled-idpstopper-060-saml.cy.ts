import path from 'path';
import data from '../fixtures/idpstoppersaml.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();

var kebabCase = require('lodash.kebabcase');

let testData = data;
let tempData = data;

describe('Run IDP Stopper SAML Test', () => {
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      let req = new Request();
      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        cy.setid('admin').then(() => {
          cy.login(null, null, null, null);
        });
        req.showCreateContent(data);
        req.populateCreateContent(data);
        req.createRequest();
        Cypress.env('name', data.create.projectname + '@' + req.getDate());
        cy.logout(null);
        cy.clearAllSessionStorage();
      });

      // Using the SAML Playground to test the IDP Stopper
      it('Get configuration', () => {
        cy.setid('admin').then(() => {
          cy.login(null, null, null, null);
        });
        cy.contains('td', Cypress.env('test')).parent().click();
        cy.wait(1000);
        // Download the JSON file
        cy.get('#rc-tabs-1-tab-tech-details').click();
        cy.get('div').contains('Installation JSONs').should('be.visible');
        cy.get('button').contains('Download').should('be.visible');
        cy.get('button').contains('Download').focus().realClick();
        cy.wait(5000);
        cy.logout(null);
        cy.clearAllSessionStorage();
      });
      it('Applies Config and Test', () => {
        const downloadsFolder = Cypress.config('downloadsFolder');
        const filePath = path.join(
          '/home/runner/work/sso-requests-e2e/testing/cypress/downloads',
          Cypress.env('name') + '-installation-dev.json',
        );

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

      it('Delete the request', () => {
        cy.setid('admin').then(() => {
          cy.login(null, null, null, null);
        });
        let req = new Request();
        req.deleteRequest(Cypress.env('test'));
        cy.logout(null);
      });
    }
  });
});
