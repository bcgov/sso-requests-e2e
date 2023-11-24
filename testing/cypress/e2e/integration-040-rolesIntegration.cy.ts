// Update of Integration request variants

import data from '../fixtures/requests.json'; // The data file will drive the tests
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
  testData.forEach((data, index) => {
    // Only run when there is actual specs for this
    if (data.roles) {
      if (data.roles[0].add) {
        it(`Add Roles ${data.create[0].projectname} (Test ID: ${data.roles[0].add[0].test_id}) - ${data.roles[0].add[0].description}`, () => {
          let req = new Request();
          req.showCreateContent(data);
          req.populateCreateContent(data);
          req.addRole(req.id);
          req = null;
        });
      }

      if (data.roles[0].remove) {
        it(`Remove Roles ${data.create[0].projectname} (Test ID: ${data.roles[0].remove[0].test_id}) - ${data.roles[0].remove[0].description}`, () => {
          let req = new Request();
          req.showCreateContent(data);
          req.populateCreateContent(data);
          req.removeRole(req.id);
          req = null;
        });
      }

      if (data.roles[0].search) {
        it(`Search Roles ${data.create[0].projectname} (Test ID: ${data.roles[0].search[0].test_id}) - ${data.roles[0].search[0].description}`, () => {
          let req = new Request();
          req.showCreateContent(data);
          req.populateCreateContent(data);
          req.searchRole(req.id);
          req = null;
        });
      }
    }
  });
});
