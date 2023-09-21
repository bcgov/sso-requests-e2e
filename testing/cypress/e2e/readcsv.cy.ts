describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.writeFile('cypress/fixtures/test.txt', '00008000\n', { flag: 'a+' })
    cy.writeFile('cypress/fixtures/test.txt', '00008001\n', { flag: 'a+' })
    cy.writeFile('cypress/fixtures/test.txt', '00008002\n', { flag: 'a+' })

  })
})