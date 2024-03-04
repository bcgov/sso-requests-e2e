import Request from '../appActions/Request';
import Utility from '../appActions/Utilities';
let util = new Utility();

describe('Delete All Integrations', () => {
  before(() => {
    cy.cleanGC();
  });

  after(() => {
    cy.cleanGC();
  });
  it('Delete All Requests as default user', function () {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    let req = new Request();
    req.deleteAllRequests();
    cy.logout(null);
  });
});
