// Creation of team variants
import Request from 'cypress/appActions/Request';

describe('Create Teams', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('composite', function () {
    let req = new Request();
    req.createCompositeRole('00009840', 'test1', 'test2', 'dev');
    req.createCompositeRole('00009840', 'test2', 'test5', 'test');
  });
});
