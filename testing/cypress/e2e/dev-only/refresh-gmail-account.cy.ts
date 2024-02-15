describe('Login Google', () => {
  it('should input email and password', { baseUrl: 'https://accounts.google.com' }, function () {
    // Handling all errors and 'skipping' test to avoid global failure.
    cy.on('uncaught:exception', (err, runnable) => {
      console.error('Google Login -> uncaught:exception', err);
      // Skip test from https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__errors
      return false;
    });
    // Make gmail address and password available to the test
    cy.setid('gmail');

    cy.clearAllSessionStorage();
    cy.visit('/servicelogin');
    cy.wait(3000);

    // Google Login Redirection: Email Input
    cy.url()
      .should('contain', 'accounts.google.com')
      .get('input[type="email"]')
      .type(Cypress.env('username'))
      .type('{enter}')
      .wait(3000);

    // Google Login Redirection: Password Input
    cy.url()
      .should('contain', 'accounts.google.com')
      .get('input[type="password"]')
      .type(Cypress.env('password'))
      .type('{enter}')
      .wait(3000);
    // Logout
    cy.visit('https://www.google.com/accounts/Logout');
  });
});
