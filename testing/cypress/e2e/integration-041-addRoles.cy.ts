// Update of Integration request variants

import data from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;

describe('Add Roles', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Add Roles
  testData.forEach((value, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Add Roles ${value.id}: ${value.create.projectname}`, () => {
        let req = new Request();
        req.populateCreateContent(value);
        req.showCreateContent(value);
        req.addRoles();
        req = null;
      });
    }
  });
});
