import data from '../fixtures/github-bcgov-idp.json'; // The data file will drive the tests
import Request from '../appActions/Request';
var kebabCase = require('lodash.kebabcase');

const { githubBCGovIDP, githubPublicIDP } = data;

const fillInPlayground = (client, url = 'https://dev.sandbox.loginproxy.gov.bc.ca/auth' + '{enter}') => {
  cy.get('div').contains('Keycloak OIDC Config').click({ force: true });
  cy.get('input[name="url"]').clear().type(url);

  // Create client id from project name and integration id
  cy.get('input[name="clientId"]').clear().type(client);

  cy.get('button').contains('Update').click();
  cy.wait(2000); // Wait a bit because otherwise it will not pick up the value
};

describe('Github BCGov intergration', () => {
  let req = new Request();
  req.populateCreateContent(githubBCGovIDP);

  it('Can create the Github BCGov integration', () => {
    cy.setid('default');
    cy.login(null, null, null, null);
    req.createRequest();
    cy.logout(null);
  });

  it('Blocks users outside of the organization from logging in with GitHub BCGov IDP', () => {
    cy.visit('https://bcgov.github.io/keycloak-example-apps/');
    fillInPlayground(kebabCase(githubBCGovIDP.create.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');
    cy.get('button').contains('Login').click();

    cy.wait(2000); // Wait a bit because to make sure the page is loaded

    const user = Cypress.env('users').find((user) => user.type === 'githubpublic');

    // Attempt login with external account (not in the bcgovsso org)
    cy.get('input#login_field').type(user.username, { log: false });
    cy.get('input#password').type(user.password, { log: false });
    cy.get('input[type="submit"]').click();

    cy.contains('Are you part of the GitHub BC Gov Org');
  });

  it('Allows users inside the organization to login', () => {
    // Test login on playground application
    cy.visit('https://bcgov.github.io/keycloak-example-apps/');

    fillInPlayground(kebabCase(githubBCGovIDP.create.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');

    cy.get('button').contains('Login').click();
    cy.wait(2000); // Wait a bit because to make sure the page is loaded

    const user = Cypress.env('users').find((user) => user.type === 'githubbcgov');

    cy.get('input#login_field').type(user.username, { log: false });
    cy.get('input#password').type(user.password, { log: false });
    cy.get('input[type="submit"]').click();

    cy.contains('Keycloak OIDC Playground');
    cy.contains('Payload');
  });

  it('Can delete the BCGov Github integration', () => {
    cy.login(null, null, null, null);
    req.deleteRequest(Cypress.env('test'));
    cy.logout(null);
  });
});

describe('Github public intergration', () => {
  let req = new Request();
  req.populateCreateContent(githubPublicIDP);

  // Creating a bcgov public integration requires admin account
  const username = Cypress.env('adminUsername');
  const password = Cypress.env('adminPassword');

  it('Can create the Github BCGov integration', () => {
    cy.setid('admin');
    cy.login(null, null, null, null);
    req.createRequest();
    cy.logout(null);
  });

  it('Allows github users external to the organization to login with public github IDP', () => {
    // Test login on playground application
    cy.visit('https://bcgov.github.io/keycloak-example-apps/');

    fillInPlayground(kebabCase(githubPublicIDP.create.projectname) + '-' + Number(Cypress.env('test')) + '{enter}');
    cy.get('button').contains('Login').click();
    cy.wait(2000); // Wait a bit because to make sure the page is loaded

    const user = Cypress.env('users').find((user) => user.type === 'githubpublic');

    cy.get('input#login_field').type(user.username, { log: false });
    cy.get('input#password').type(user.password, { log: false });
    cy.get('input[type="submit"]').click();

    cy.contains('Keycloak OIDC Playground');
    cy.contains('Payload');
  });

  it('Can delete the BCGov Github integration', () => {
    cy.login(null, null, null, null);
    req.deleteRequest(Cypress.env('test'));
    cy.logout(null);
  });
});
