// Update of Integration request variants

import data from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Add Users to Roles
  testData.forEach((value, index) => {
    it(`Add Users to Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.addUserToRoles();
      req = null;
    });
  });
});
