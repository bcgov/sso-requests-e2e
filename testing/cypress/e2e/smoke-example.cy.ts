describe('Login', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Navigate', () => {
    cy.get('table[role="table"] > tbody > tr > td').contains("00008760").get('svg.fa-pen-to-square').click();
    
  })
})
