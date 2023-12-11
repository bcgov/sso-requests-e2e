describe('clipboard', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  it('copies text from Copy Configuration', () => {
    cy.contains('td', '00010100').parent().click();
    cy.wait(1000);
    cy.get('#rc-tabs-1-tab-tech-details').click();
    cy.get('div').contains('Installation JSONs').should('be.visible');
    cy.get('button').contains('Download').should('be.visible');
    cy.get('button').contains('Download').focus().realClick();
    cy.wait(2000);
    cy.readFile('../testing/cypress/downloads/Test Automation do not delete-installation-dev.json')
      .its('auth-server-url')
      .then((authServerUrl: string) => {
        console.log(authServerUrl);
      });
  });
});
