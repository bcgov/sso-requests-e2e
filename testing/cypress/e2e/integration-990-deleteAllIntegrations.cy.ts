import Request from '../appActions/Request';
before(() => {
  cy.cleanGC();
});

after(() => {
  cy.cleanGC();
});

describe('Delete All Integrations', () => {
  it('Delete All Requests as default user', function () {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    let req = new Request();
    req.deleteAllRequests();
    cy.logout(null);
  });
});
