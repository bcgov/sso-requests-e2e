// Creation of Integration request variants

import data from '../fixtures/idpstopper.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;
let tempData = data;
let parsedObject;
let resourceValue: string;
let authServerUrl: string;

describe('Run IDP Stopper Test', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  /*   afterEach(() => {
    cy.logout(null);
  }); */

  after(() => {
    cy.writeFile('cypress/fixtures/idpstopperafter.json', tempData);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
      let req = new Request();
      req.showCreateContent(data);
      req.populateCreateContent(data);
      cy.wrap(req.createRequest()).then(() => {
        tempData[index].id = Cypress.env('test');
      });
    });

    it('Copies text from Configuration', () => {
      cy.contains('td', Cypress.env('test')).parent().click();
      cy.get('#rc-tabs-1-tab-tech-details', { timeout: 10000 }).click();
      cy.get('div').contains('Installation JSONs').should('be.visible');
      cy.get('button', { timeout: 10000 }).contains('Copy').should('be.visible');
      cy.get('button').contains('Copy').focus().realClick();
      console.log('Reading Clipboard');
      cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
          text = JSON.stringify(text);
          parsedObject = JSON.parse(text);
          resourceValue = parsedObject.resource;
          Cypress.env('resourceValue', resourceValue);
          authServerUrl = parsedObject['auth-server-url'];
          Cypress.env('authServerUrl', authServerUrl);
        });
      });
    });

    it('Go to Playground', () => {
      cy.visit('https://bcgov.github.io/keycloak-example-apps/');
      cy.get('div').contains('Keycloak OIDC Config').click({ force: true });
      cy.get('input[name="url"]').clear().type(Cypress.env('authServerUrl'));
      cy.get('input[name="clientId"]').clear().type(Cypress.env('resourceValue'));
      cy.get('button').contains('Update').click();
      cy.get('button').contains('Login').click();
    });

    it('Delete the request', () => {
      let req = new Request();
      req.deleteRequest(Cypress.env('test'));
    });
  });
});
