// Creation of pre-reqs for test

import data from '../fixtures/pre-req.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Playground from '../pageObjects/playgroundPage';
import Utilities from '../appActions/Utilities';
var kebabCase = require('lodash.kebabcase');

let testData = data;
let util = new Utilities();
let playground = new Playground();
let req = new Request();

describe('Create Integration Requests', () => {
  beforeEach(() => {
    cy.cleanGC();
    cy.clearAllSessionStorage();
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });
  afterEach(() => {
    cy.cleanGC();
    cy.clearAllSessionStorage();
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });
      req.showCreateContent(data);
      req.populateCreateContent(data);
      req.createRequest();
      cy.logout(null);
    });

    it(`Login with bceidbasic`, () => {
      cy.session('bceidbasic', () => {
        cy.visit(playground.path);

        playground.selectConfig();
        playground.setAuthServerUrl();
        playground.setRealm();
        playground.setClientId(
          kebabCase('Test Automation do not delete') +
            '-' +
            util.getDate() +
            '-' +
            Number(Cypress.env(util.md5('Test Automation do not delete'))),
        );

        playground.selectOptions();
        playground.setIDPHint('bceidbasic');
        playground.clickUpdate();
        playground.clickLogin();
        cy.setid('bceidbasic').then(() => {
          playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
        });

        cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
        cy.get('button', { timeout: 10000 }).contains('Logout').click({ force: true });
      });
    });

    it(`Login with bceidbusiness`, () => {
      cy.session('bceidbusiness', () => {
        cy.visit(playground.path);

        playground.selectConfig();
        playground.setAuthServerUrl();
        playground.setRealm();
        playground.setClientId(
          kebabCase('Test Automation do not delete') +
            '-' +
            util.getDate() +
            '-' +
            Number(Cypress.env(util.md5('Test Automation do not delete'))),
        );

        playground.selectOptions();
        playground.setIDPHint('bceidbusiness');
        playground.clickUpdate();
        playground.clickLogin();
        cy.setid('bceidbusiness').then(() => {
          playground.loginBusinesBCeID(Cypress.env('username'), Cypress.env('password'));
        });

        cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
        cy.get('button', { timeout: 10000 }).contains('Logout').click({ force: true });
      });
    });

    // Cannot run this login because of github labeling this account as spam.
    /*     it(`Login with githubbcgov`, () => {
      cy.session('githubbcgov', () => {
        cy.visit(playground.path);

        playground.selectConfig();
        playground.setAuthServerUrl();
        playground.setRealm();
        playground.setClientId(
          kebabCase('Test Automation do not delete') +
            '-' +
            util.getDate() +
            '-' +
            Number(Cypress.env(util.md5('Test Automation do not delete'))),
        );

        playground.selectOptions();
        playground.setIDPHint('githubbcgov');
        playground.clickUpdate();
        playground.clickLogin();
        cy.setid('githubbcgov').then(() => {
          playground.loginGithubbcGov(Cypress.env('username'), Cypress.env('password'), Cypress.env('otpsecret'));
        });

        cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
        cy.get('button', { timeout: 10000 }).contains('Logout').click({ force: true });
      });
    }); */
  });
});
