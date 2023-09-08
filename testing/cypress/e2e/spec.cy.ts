describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env("host"))
    cy.wait(3000);
    cy.querySelectorIncludesText('button', 'Log in').click();
  })
})