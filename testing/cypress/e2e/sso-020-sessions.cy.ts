import data from '../fixtures/sso-test.json'; // The data file will drive the tests
import Playground from '../pageObjects/playgroundPage';
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
import cypress from 'cypress';
var kebabCase = require('lodash.kebabcase');
let util = new Utilities();
let req = new Request();

let testData = data;

describe('SSO Tests', () => {
  beforeEach(() => {
    //Establish the session with CSS Sandbox: IDIR
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
      // In the playground set the IDP hint to bceidbasic and click login
      // Different application, different client, different IDP
      cy.clearAllSessionStorage();
      cy.cleanGC();
      let playground = new Playground();
      cy.visit(playground.path);
      playground.selectConfig();
      playground.setAuthServerUrl();
      playground.setRealm();
      playground.setClientId(
        kebabCase(data.integration_1) + '-' + util.getDate() + '-' + Number(Cypress.env('integration_1_id')),
      );

      playground.selectOptions();
      playground.setIDPHint(data.idp_hint_1);

      playground.selectConfig();
      playground.clickUpdate();
      playground.clickLogin();

      // Log in
      if (data.idp_hint_1 === 'idir') {
        cy.setid(null).then(() => {
          playground.loginIDIR(Cypress.env('username'), Cypress.env('password'));
        });
      } else if (data.idp_hint_1 === 'bceidbasic') {
        cy.setid(data.idp_hint_1).then(() => {
          playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
        });
      }

      // Second Login
      cy.visit('http://localhost:3000');
      playground.selectConfig();
      playground.setAuthServerUrl();
      playground.setRealm();
      playground.setClientId(
        kebabCase(data.integration_2) + '-' + util.getDate() + '-' + Number(Cypress.env('integration_2_id')),
      );

      /* playground.selectOptions();
      playground.setIDPHint(data.idp_hint_2); */

      playground.selectConfig();
      playground.clickUpdate();
      playground.clickLogin();

      // Log in
      if (data.idp_hint_2 === 'bceidbasic') {
        cy.setid('bceidbasic').then(() => {
          playground.loginBasicBCeID(Cypress.env('username'), Cypress.env('password'));
        });
      } else if (data.idp_hint_2 === 'idir') {
        cy.setid(null).then(() => {
          playground.loginIDIR(Cypress.env('username'), Cypress.env('password'));
        });
      }
      cy.pause();
      // This tells of a succesfull log in and that the session is attached to the user
      cy.get('button', { timeout: 10000 }).contains('Logout').should('exist');
      cy.get('button', { timeout: 10000 }).contains('Logout').click({ force: true });
    });
  });
});
