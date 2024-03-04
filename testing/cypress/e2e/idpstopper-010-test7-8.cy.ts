// Creation of Integration request variants

import data from '../fixtures/idpstopper.json'; // The data file will drive the tests
import Request from '../appActions/Request';
var kebabCase = require('lodash.kebabcase');
import Utilities from '../appActions/Utilities';
let util = new Utilities();

let testData = data;
let tempData = data;

describe('Run IDP Stopper Test', () => {
  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        cy.setid(null).then(() => {
          cy.login(null, null, null, null);
        });
        let req = new Request();
        req.showCreateContent(data);
        req.populateCreateContent(data);
        cy.wrap(req.createRequest()).then(() => {
          tempData[index].id = Cypress.env(util.md5(data.create.projectname));
        });
        cy.logout(null);
      });

      // Using the OIDC Playground to test the IDP Stopper
      it('Go to Playground', () => {
        cy.visit('https://bcgov.github.io/keycloak-example-apps/');
        cy.get('div').contains('Keycloak OIDC Config').click({ force: true });

        // Need to add {enter} to the end of the input strings to get it to work, otherwise the changes are not picked up.
        cy.get('input[name="url"]')
          .clear()
          .type('https://dev.sandbox.loginproxy.gov.bc.ca/auth' + '{enter}');

        // Create client id from project name and integration id
        cy.get('input[name="clientId"]')
          .clear()
          .type(kebabCase(data.create.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');

        cy.get('button').contains('Update').click();
        cy.wait(2000); // Wait a bit because otherwise it will not pick up the value

        /*       // Set options if required
      cy.get('div').contains('Keycloak Login Options').click({ force: true });
      // Set options - not implemented yet
      cy.get('button').contains('Update').click();
      cy.wait(2000); // Wait a bit because otherwise it will not pick up the value */

        cy.get('button').contains('Login').click();
        cy.wait(2000); // Wait a bit because to make sure the page is loaded

        // Only go here when there is more than one IDP Specified
        if (data.create.identityprovider.length > 1) {
          // On the IDP Select Page, select/test the IDP
          cy.get('#kc-social-providers').within(() => {
            let n = 0;
            while (n < data.create.identityprovider.length) {
              if (data.create.identityprovider[n] !== '') {
                cy.contains('li', data.create.identityprovider[n]);
              }
              n++;
            }
          });
        } else {
          cy.get('#login-to').should('contain', 'Log in to sfstest7.gov.bc.ca');
        }
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
});
