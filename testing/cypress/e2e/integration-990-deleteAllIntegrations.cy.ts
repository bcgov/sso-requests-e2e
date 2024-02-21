import Request from '../appActions/Request';

describe('Delete All Integrations', () => {
  let req = new Request();
  beforeEach(() => {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Delete All Requests', function () {
    req.deleteAllRequests();
  });
});
