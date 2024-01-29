// Creation of Integration request variants

import data from '../fixtures/idpstopper11.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Playground from '../pageObjects/playgroundPage';
var kebabCase = require('lodash.kebabcase');

let testData = data;
let tempData = data;

describe('Run IDP Stopper Test', () => {
  testData.forEach((data, index) => {
    it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });
      let req = new Request();
      req.showCreateContent(data);
      req.populateCreateContent(data);
      cy.wrap(req.createRequest()).then(() => {
        tempData[index].id = Cypress.env('test');
      });
      cy.logout(null);
    });

    // Using the OIDC Playground to test the IDP Stopper
    it('Go to Playground', () => {
      let playground = new Playground();
      cy.visit(playground.path);
      playground.selectConfig();
      playground.setAuthServerUrl('https://dev.sandbox.loginproxy.gov.bc.ca/auth');
      playground.setRealm('standard');
      playground.setClientId(kebabCase(data.create.projectname) + '-' + Number(Cypress.env('test')));
      playground.clickUpdate();
      cy.wait(2000); // Wait a bit because otherwise it will not pick up the value
      playground.clickLogin();
      cy.wait(2000); // Wait a bit because to make sure the page is loaded

      cy.log(data.create.identityprovider[0]);
      if (data.create.identityprovider[0] == 'Basic BCeID') {
        cy.setid('bceidbasic').then(() => {
          cy.log(Cypress.env('username'));
          playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
        });
      } else if (data.create.identityprovider[0] == 'Business BCeID') {
        cy.setid('bceidbusiness').then(() => {
          cy.log(Cypress.env('username'));
          playground.loginBusinesBCeID(Cypress.env('username'), Cypress.env('password'));
        });
      } else if (data.create.identityprovider[0] == 'GitHub BC Gov') {
        cy.setid('githubbcgov').then(() => {
          cy.log(Cypress.env('username'));
          playground.loginGithubbcGov(Cypress.env('username'), Cypress.env('password'));
        });
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
  });
});
