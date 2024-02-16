// Update of Integration request variants

import data from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Create Composite Roles
  testData.forEach((value, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Create Composite Roles ${value.id}: ${value.create.projectname}`, () => {
        let req = new Request();
        req.populateCreateContent(value);
        req.showCreateContent(value);
        req.createCompositeRoles();
        req = null;
      });
    }
  });
});
