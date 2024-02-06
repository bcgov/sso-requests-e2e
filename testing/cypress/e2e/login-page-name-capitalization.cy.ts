import data from '../fixtures/capitalizationFixtures.json'; // The data file will drive the tests
import Request from '../appActions/Request';
var kebabCase = require('lodash.kebabcase');

let tempData = data;

describe('Create Integration Requests For login page capitalization', () => {
  // Create an integration with 2 or more IDPs and an ssoheaderdev with capitalization
  it(`Create ${data[0].create.projectname} (Test ID: ${data[0].create.test_id}) - ${data[0].create.description}`, () => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    let req = new Request();
    req.showCreateContent(data[0]);
    req.populateCreateContent(data[0]);
    cy.wrap(req.createRequest()).then(() => {
      tempData[0].id = Cypress.env('test');
    });
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
      .type(kebabCase(data[0].create.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');

    cy.get('button').contains('Update').click();
    cy.wait(2000); // Wait a bit because otherwise it will not pick up the value

    cy.get('button').contains('Login').click();
    cy.wait(2000); // Wait a bit because to make sure the page is loaded

    // On the IDP Select Page, select/test the IDP
    cy.get('#kc-header-wrapper').contains(data[0].create.ssoheaderdev);
    cy.get('#kc-social-providers').within(() => {
      let n = 0;
      while (n < data[0].create.identityprovider.length) {
        if (data[0].create.identityprovider[n] !== '') {
          cy.contains('li', data[0].create.identityprovider[n]);
        }
        n++;
      }
    });
  });

  it('Delete the request', () => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    let req = new Request();
    req.deleteRequest(Cypress.env('test'));
    cy.logout(null);
  });
});
