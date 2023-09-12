// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

describe('Example navigation smoke test', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

     it('Edit Selected Row', function (){
      const requestID = '00008859'; 
      // identify first column
       cy.get('table[role="table"] > tbody > tr > td:nth-child(1)').each(($elm, index, $list)=> {
          // text captured from column1
          const t = $elm.text();
          // matching criteria
          if (t.includes(requestID)){
             cy.get('[data-icon="pen-to-square"]').eq(index).click();
          }
        })
        cy.get('h1').contains('Editing Req ID: ' + requestID + ' - Enter requester information');
        cy.get('[data-testid="stage-1"]').click();
        cy.get('[data-testid="stage-2"]').click();
        cy.get('[data-testid="stage-3"]').click();
        cy.get('[data-testid="stage-4"]').click();
        cy.get('button').contains('Update').click();
        cy.get('[data-testid="confirm-delete"]').click();

})
})
