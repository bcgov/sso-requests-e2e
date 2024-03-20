// Update of Integration request variants

import data from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;
let req = new Request();

describe('Add Roles', () => {
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

  // Add Roles
  testData.forEach((value, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(value)) {
      it(`Add Roles ${value.id}: ${value.create.projectname}`, () => {
        req.populateCreateContent(value);
        req.showCreateContent(value);
        req.addRoles();
      });
    }
  });
});
