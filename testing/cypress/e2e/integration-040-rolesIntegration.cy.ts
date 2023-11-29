// Update of Integration request variants

import data from '../fixtures/requests-copy.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  /*   testData.forEach((value, index) => {
    it(`Add Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.addRoles();
      req = null;
    });
  });

  testData.forEach((value, index) => {
    it(`Add Users to Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.addUserToRoles()
      req = null;
    });
  });
 */
  testData.forEach((value, index) => {
    it(`Remove Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.removeRoles();
      req = null;
    });
  });
});
