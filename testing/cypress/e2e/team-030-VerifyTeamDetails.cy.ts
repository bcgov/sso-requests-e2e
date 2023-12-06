import Team from '../appActions/Team';

describe('Verify Team Details', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Check Team Members', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Do not delete Team').parent().click();
    cy.get('div.rc-tabs.rc-tabs-top')
      .eq(1)
      .within(() => {
        cy.get('#rc-tabs-1-tab-members').contains('Members').click({ force: true }); //Members
        cy.contains('td', 'pathfinder.ssotraining@gov.bc.ca').should('be.visible');
      });
  });

  it('Check Team Integrations', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Roland and Training Account').parent().click();
    cy.get('div.rc-tabs.rc-tabs-top')
      .eq(1)
      .within(() => {
        cy.get('#rc-tabs-1-tab-integrations').contains('Integrations').click({ force: true }); //Integrations
        cy.contains('td', 'Test Automation do not delete').should('be.visible');
      });
  });

  it('Check Team Service Accounts', function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
    cy.contains('td', 'Roland and Training Account').parent().click();
    cy.get('div.rc-tabs.rc-tabs-top')
      .eq(1)
      .within(() => {
        cy.get('div#rc-tabs-1-tab-service-accounts').contains('CSS API Account').click({ force: true }); //CSS API Accounts
        cy.contains('td', '9839').should('be.visible');
      });
  });
});
