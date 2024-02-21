import Request from '../appActions/Request';

describe('Delete All Integrations', () => {
  let req = new Request();
  it('Delete All Requests as admin', function () {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
    req.deleteAllRequests();
    cy.logout(null);
    cy.clearAllSessionStorage();
  });

  it('Delete All Requests as default user', function () {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    req.deleteAllRequests();
    cy.logout(null);
    cy.clearAllSessionStorage();
  });
});
