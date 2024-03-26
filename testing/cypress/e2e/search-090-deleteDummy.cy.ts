// Searching for Users in the IDIM Search

import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let req = new Request();

describe('Delete Dummy', () => {
  before(() => {
    cy.cleanGC();
  });
  after(() => {
    cy.cleanGC();
  });
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });
  afterEach(() => {
    cy.logout(null);
  });

  it(`Delete Dummy: "${'Test Automation do not delete' + '@' + util.getDate()}"}`, () => {
    req.getID('Test Automation do not delete' + '@' + util.getDate()).then(() => {
      req.deleteRequest(req.id);
    });
  });
});
