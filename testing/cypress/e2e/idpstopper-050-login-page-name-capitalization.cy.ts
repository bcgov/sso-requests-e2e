import data from '../fixtures/capitalization-fixtures.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
var kebabCase = require('lodash.kebabcase');

describe('Create Integration Requests For login page capitalization', () => {
  const request = data[0].create;

  // Only run the test if the smoketest flag is set and the test is a smoketest
  let runOK = true;
  if (Cypress.env('smoketest') && !data[0].smoketest) {
    runOK = false;
  }
  if (runOK) {
    // Create an integration with 2 or more IDPs and an ssoheaderdev with capitalization
    it(`Create ${request.projectname} (Test ID: ${request.test_id}) - ${request.description}`, () => {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });
      let req = new Request();
      req.showCreateContent(data[0]);
      req.populateCreateContent(data[0]);
      req.createRequest();
      cy.logout(null);
    });

    // Using the OIDC Playground to test the IDP Stopper
    it('Go to Playground', () => {
      console.log('Went to playground');
      cy.visit('https://bcgov.github.io/keycloak-example-apps/');
      cy.get('div').contains('Keycloak OIDC Config').click({ force: true });

      // Need to add {enter} to the end of the input strings to get it to work, otherwise the changes are not picked up.
      cy.get('input[name="url"]')
        .clear()
        .type('https://dev.sandbox.loginproxy.gov.bc.ca/auth' + '{enter}');

      // Create client id from project name and integration id
      cy.get('input[name="clientId"]')
        .clear()
        .type(kebabCase(request.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');

      cy.get('button').contains('Update').click();
      cy.wait(2000); // Wait a bit because otherwise it will not pick up the value

      cy.get('button').contains('Login').click();
      cy.wait(2000); // Wait a bit because to make sure the page is loaded

      // On the IDP Select Page, confirm the title is correctly capitalized.
      cy.get('#kc-header-wrapper').contains(request.ssoheaderdev);
    });

    it('Delete the request', () => {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });
      let req = new Request();
      req.deleteRequest(Cypress.env('test'));
      cy.logout(null);
    });
  }
});
