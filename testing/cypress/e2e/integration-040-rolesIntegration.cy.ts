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

  // Add Roles
  testData.forEach((value, index) => {
    it(`Add Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.addRoles();
      req = null;
    });
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

  // Create Composite Roles
  testData.forEach((value, index) => {
    it(`Create Composite Roles ${value.id}: ${value.create.projectname}`, () => {
      let req = new Request();
      req.populateCreateContent(value);
      req.showCreateContent(value);
      req.createCompositeRoles();
      req = null;
    });
  });

  // Remove Roles
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
