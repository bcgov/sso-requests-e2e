import data from '../fixtures/github-bcgov-idp.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Playground from '../pageObjects/playgroundPage';
var kebabCase = require('lodash.kebabcase');
import Utilities from '../appActions/Utilities';
let util = new Utilities();

const { githubBCGovIDP, githubPublicIDP } = data;

describe('Github BCGov integration', () => {
  before(() => {
    cy.cleanGC();
  });

  after(() => {
    cy.cleanGC();
  });

  let req = new Request();
  let playground = new Playground();
  req.populateCreateContent(githubBCGovIDP);

  it('Can create the Github BCGov integration', () => {
    cy.setid('default').then(() => {
      cy.login(null, null, null, null);
    });
    req.createRequest();
    cy.logout(null);
  });

  it('Blocks users outside of the organization from logging in with GitHub BCGov IDP', () => {
    cy.visit(playground.path);
    playground.fillInPlayground(
      'https://dev.sandbox.loginproxy.gov.bc.ca/auth',
      'standard',
      kebabCase(githubBCGovIDP.create.projectname) + '-' + req.getDate() + '-' + Number(Cypress.env('test')),
    );
    playground.clickLogin();

    const user = Cypress.env('users').find((user) => user.type === 'githubpublic');
    playground.loginGithub(user.username, user.password, user.otpsecret);
    cy.contains('Are you part of the GitHub BC Gov Org', { timeout: 10000 });
  });

  it('Allows users inside the organization to login', () => {
    // Test login on playground application
    cy.visit(playground.path);
    playground.fillInPlayground(
      'https://dev.sandbox.loginproxy.gov.bc.ca/auth',
      'standard',
      kebabCase(githubBCGovIDP.create.projectname) + '-' + req.getDate() + '-' + Number(Cypress.env('test')),
    );
    playground.clickLogin();

    const user = Cypress.env('users').find((user) => user.type === 'githubbcgov');
    playground.loginGithub(user.username, user.password, user.otpsecret);

    cy.contains('Keycloak OIDC Playground');
    cy.contains('Payload');
  });

  it('Can delete the BCGov Github integration', () => {
    cy.setid('default').then(() => {
      cy.login(null, null, null, null);
    });
    req.deleteRequest(Cypress.env('test'));
    cy.logout(null);
  });
});

describe('Github public integration', () => {
  before(() => {
    cy.cleanGC();
  });

  after(() => {
    cy.cleanGC();
  });

  let req = new Request();
  let playground = new Playground();
  req.populateCreateContent(githubPublicIDP);

  it('Can create the Github public integration', () => {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
    req.createRequest();
    cy.logout(null);
  });

  it('Allows github users external to the organization to login with public github IDP', () => {
    cy.visit(playground.path);
    playground.fillInPlayground(
      'https://dev.sandbox.loginproxy.gov.bc.ca/auth',
      'standard',
      kebabCase(githubPublicIDP.create.projectname) + '-' + req.getDate() + '-' + Number(Cypress.env('test')),
    );
    playground.clickLogin();

    const user = Cypress.env('users').find((user) => user.type === 'githubpublic');
    playground.loginGithub(user.username, user.password, user.otpsecret);
    cy.contains('Keycloak OIDC Playground');
    cy.contains('Payload');
  });

  it('Can delete the Github public integration', () => {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
    req.deleteRequest(Cypress.env('test'));
    cy.logout(null);
  });
});
