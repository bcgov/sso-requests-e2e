// Creation of Integration request variants

import data from '../fixtures/idpstopper11.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Playground from '../pageObjects/playgroundPage';
import { authenticator } from 'otplib';
import Utilities from '../appActions/Utilities';
let util = new Utilities();

var kebabCase = require('lodash.kebabcase');

let testData = data;

describe('Run IDP Stopper Test', () => {
  before(() => {
    cy.cleanGC();
  });

  after(() => {
    cy.cleanGC();
  });

  testData.forEach((data, index) => {
    let req = new Request();
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        cy.setid('admin').then(() => {
          cy.login(null, null, null, null);
        });
        req.showCreateContent(data);
        req.populateCreateContent(data);
        req.createRequest();
        cy.logout(null);
      });

      // Using the OIDC Playground to test the IDP Stopper
      it('Go to Playground', () => {
        Cypress.session.clearAllSavedSessions();
        let playground = new Playground();
        cy.visit(playground.path);
        cy.wait(2000);
        playground.selectConfig();
        playground.setAuthServerUrl('https://dev.sandbox.loginproxy.gov.bc.ca/auth');
        playground.setRealm('standard');
        cy.log(Cypress.env(util.md5(data.create.projectname)));
        playground.setClientId(
          kebabCase(data.create.projectname) +
            '-' +
            util.getDate() +
            '-' +
            Number(Cypress.env(util.md5(data.create.projectname))),
        );
        playground.selectConfig();
        playground.clickUpdate();
        cy.wait(2000); // Wait a bit because otherwise it will not pick up the value
        playground.clickUpdate();
        cy.wait(2000);
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
            const token = authenticator.generate(Cypress.env('otpsecret'));
            playground.loginGithubbcGov(Cypress.env('username'), Cypress.env('password'), token);
          });
        } else if (data.create.identityprovider[0] == 'GitHub') {
          cy.setid('githubpublic').then(() => {
            cy.log(Cypress.env('username'));
            const token = authenticator.generate(Cypress.env('otpsecret'));
            playground.loginGithubbcGov(Cypress.env('username'), Cypress.env('password'), token);
          });
        }
        cy.contains('a', 'Token Parsed', { timeout: 1000 }).click();
        cy.contains('td', 'family_name').siblings().should('be.empty');
        //contains('').should('be.visible');
        playground.clickLogout();
      });

      it('Delete the request', () => {
        cy.setid('admin').then(() => {
          cy.login(null, null, null, null);
        });
        let req = new Request();
        req.deleteRequest(Cypress.env(util.md5(data.create.projectname)));
        cy.logout(null);
      });
    }
  });
});
