import path from 'path';

describe('Download Configuration', () => {
  beforeEach(() => {
    if (cy.setid(null)) {
      cy.login(null, null, null, null);
    }
  });

  afterEach(() => {
    cy.logout(null);
  });

  it('Gets Configuration', () => {
    cy.contains('td', '00010968').parent().click();
    cy.wait(1000);
    cy.get('#rc-tabs-1-tab-tech-details').click();
    cy.get('div').contains('Installation JSONs').should('be.visible');
    cy.get('button').contains('Download').should('be.visible');
    cy.get('button').contains('Download').focus().realClick();
  });

  it('Parse Configuration', () => {
    cy.log('Next step is to get the text from the file');

    const downloadsFolder = Cypress.config('downloadsFolder');
    const filePath = path.join(downloadsFolder, 'SAML Test 1-installation-dev.json');

    cy.readFile(filePath)
      .should('exist')
      .then((content) => {
        // Parse the JSON content
        //const jsonData = JSON.parse(content);
        const jsonData = content;

        // Extracting the properties into variables
        const singleSignOnServiceURL = jsonData['Single Sign-On Service URL'];
        const singleLogoutServiceURL = jsonData['Single Logout Service URL'];
        const serviceProviderEntityID = jsonData['Service Provider Entity ID'];
        const x509Certificate = jsonData['X.509 Certificate'];

        // Use these variables as needed in your tests
        // For example, logging them
        cy.log(`Single Sign-On Service URL: ${singleSignOnServiceURL}`);
        cy.log(`Single Logout Service URL: ${singleLogoutServiceURL}`);
        cy.log(`Service Provider Entity ID: ${serviceProviderEntityID}`);
        cy.log(`X.509 Certificate: ${x509Certificate}`);
      });
  });
});
