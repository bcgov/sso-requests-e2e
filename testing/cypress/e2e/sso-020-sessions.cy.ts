import data from '../fixtures/sso-test.json'; // The data file will drive the tests
import Playground from '../pageObjects/playgroundPage';
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
import cypress from 'cypress';
var kebabCase = require('lodash.kebabcase');
let util = new Utilities();
let req = new Request();
let playground = new Playground();

let testData = data;

describe('SSO Tests', () => {
  beforeEach(() => {
    //Clean as much as possible between tests.
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  after(() => {
    cy.cleanGC();
  });

  testData.forEach((data, index) => {
    it('Find Integration IDs', function () {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });

      req.getID(data.integration_1).then(() => {
        Cypress.env('integration_1_id', req.id);
      });
      req.getID(data.integration_2).then(() => {
        Cypress.env('integration_2_id', req.id);
      });

      cy.logout(null);
      cy.clearAllSessionStorage();
    });

    it(`Test: "${data.id}": ${data.idp_hint_1}/ ${data.idp_hint_2}`, function () {
      //Isolate this session to be exclusively for the test otherwise context will be shared with other tests
      cy.session(data.id, () => {
        cy.visit(playground.path);
        playground.selectConfig();
        playground.setAuthServerUrl();
        playground.setRealm();
        playground.setClientId(
          kebabCase(data.integration_1) + '-' + util.getDate() + '-' + Number(Cypress.env('integration_1_id')),
        );

        playground.selectOptions();
        playground.setIDPHint(data.idp_hint_1);

        playground.clickUpdate();
        playground.clickLogin();

        // Log in
        if (data.idp_hint_1 == 'idir') {
          cy.setid(null).then(() => {
            playground.loginIDIR(Cypress.env('username'), Cypress.env('password'));
          });
        } else if (data.idp_hint_1 == 'bceidbasic') {
          cy.setid(data.idp_hint_1).then(() => {
            playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
          });
        }
        if (data.result_1) {
          // This tells of a succesfull log in and that the session is attached to the user
          cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
        }

        // Second Login
        cy.clearCookie('KEYCLOAK_SESSION_LEGACY', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KEYCLOAK_SESSION', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KEYCLOAK_REMEMBER_ME', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KEYCLOAK_LOCALE', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KEYCLOAK_IDENTITY_LEGACY', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KEYCLOAK_IDENTITY', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('KC_RESTART', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('FORMCRED', { domain: 'https://logontest7.gov.bc.ca' });
        cy.clearCookie('AUTH_SESSION_ID_LEGACY', { domain: 'https://logontest7.gov.bc.ca' });

        cy.visit(playground.path);

        playground.selectConfig();
        playground.setAuthServerUrl();
        playground.setRealm();
        playground.setClientId(
          kebabCase(data.integration_2) + '-' + util.getDate() + '-' + Number(Cypress.env('integration_2_id')),
        );

        playground.selectOptions();
        playground.setIDPHint(data.idp_hint_2);

        //playground.selectConfig();
        playground.clickLogin();
        if (data.result_2) {
          // This tells of a succesfull log in and that the session is attached to the user
          cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
        } else {
          if (data.idp_hint_2 == 'bceidbasic') {
            cy.setid('bceidbasic').then(() => {
              playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
            });
          } else if (data.idp_hint_2 == 'idir') {
            cy.setid(null).then(() => {
              playground.loginIDIR(Cypress.env('username'), Cypress.env('password'));
            });
          }
          if (!data.result_2) {
            cy.get('#kc-error-message > p').contains(data.error_2);
          }
        }
        // This tells of a succesfull log in and that the session is attached to the user
        if (data.result_2) {
          // This tells of a succesfull log in and that the session is attached to the user
          cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
          cy.get('button', { timeout: 10000 }).contains('Logout').click({ force: true });
        }
      });
    });
  });
});
