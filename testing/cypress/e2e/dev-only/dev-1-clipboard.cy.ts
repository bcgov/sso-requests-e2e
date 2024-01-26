describe('clipboard', () => {
  beforeEach(() => {
    if (cy.setid(null)) {
      cy.login(null, null, null, null);
    }
  });

  afterEach(() => {
    cy.logout(null);
  });

  it('copies text from Copy Configuration', () => {
    cy.contains('td', '00010968').parent().click();
    cy.wait(1000);
    cy.get('#rc-tabs-1-tab-tech-details').click();
    cy.get('div').contains('Installation JSONs').should('be.visible');
    cy.get('button').contains('Download').should('be.visible');
    cy.get('button').contains('Download').focus().realClick();
    cy.wait(2000);
    cy.readFile('../testing/cypress/downloads/SAML Test 1-installation-dev.json')
      .its('Single Sign-On Service URL')
      .then((authServerUrl: string) => {
        console.log(authServerUrl);
      });
  });
});
