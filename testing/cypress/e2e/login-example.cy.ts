describe('Login', () => {
  beforeEach(() => {
    cy.visit(Cypress.env("host"));

    cy.get('h1').contains('Common Hosted Single Sign-on (CSS)').should('be.visible');
    cy.get('button').contains("Log in").click();
    
    cy.get('#kc-header-wrapper').contains('Common Hosted Single Sign-on').should('be.visible');
    cy.get('#social-idir').click();

    cy.get('#login-to').contains('Log in to sfstest7.gov.bc.ca').should('be.visible');
    cy.get('#user').type(Cypress.env("username"));
    cy.get('#password').type(Cypress.env("password"));
    cy.get('input[name=btnSubmit]').click();
  });
  afterEach(() => {
    cy.get('h1').contains('Common Hosted Single Sign-on (CSS)').should('be.visible');
    cy.get('button').contains("Log out").click();
  });

  it('Navigate', () => {
    cy.get('table[role="table"] > tbody > tr > td').contains("00008760").get('svg.fa-pen-to-square').click();
    
  })
})
