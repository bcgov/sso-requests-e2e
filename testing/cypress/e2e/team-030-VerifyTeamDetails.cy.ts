import Team from '../appActions/Team';
import Utilities from '../appActions/Utilities';
let util = new Utilities();

describe('Verify Team Details', () => {
  before(() => {
    cy.cleanGC();
  });
  after(() => {
    cy.cleanGC();
  });
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Check Team Members', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Do not delete Team', { timeout: 10000 }).scrollIntoView();
    cy.contains('td', 'Do not delete Team', { timeout: 10000 }).parent().click();
    cy.get('div.rc-tabs.rc-tabs-top', { timeout: 10000 })
      .eq(1)
      .within(() => {
        cy.get('#rc-tabs-1-tab-members', { timeout: 10000 }).contains('Members').should('be.visible'); //Members
        cy.get('#rc-tabs-1-tab-members', { timeout: 10000 }).contains('Members').click({ force: true }); //Members
        cy.contains('td', 'pathfinder.ssotraining@gov.bc.ca', { timeout: 10000 }).should('be.visible');
      });
  });

  it('Check Team Integrations', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Roland and Training Account', { timeout: 10000 }).parent().click();
    cy.get('div.rc-tabs.rc-tabs-top', { timeout: 10000 })
      .eq(1)
      .within(() => {
        cy.get('#rc-tabs-1-tab-integrations', { timeout: 10000 }).contains('Integrations').should('be.visible'); //Integrations
        cy.get('#rc-tabs-1-tab-integrations', { timeout: 10000 }).contains('Integrations').click({ force: true }); //Integrations
        //  + '@' + util.getDate()
        cy.contains('td', 'Test Automation do not delete', { timeout: 10000 }).should('be.visible');
      });
  });

  it('Check Team Service Accounts', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Roland and Training Account', { timeout: 10000 }).parent().click();
    cy.get('div.rc-tabs.rc-tabs-top', { timeout: 10000 })
      .eq(1)
      .within(() => {
        cy.get('div#rc-tabs-1-tab-service-accounts', { timeout: 10000 })
          .contains('CSS API Account')
          .should('be.visible'); //CSS API Accounts
        cy.get('div#rc-tabs-1-tab-service-accounts', { timeout: 10000 })
          .contains('CSS API Account')
          .click({ force: true }); //CSS API Accounts
        cy.contains('td', '9839', { timeout: 10000 }).should('be.visible');
      });
  });
});
