// Delete Integration request that were created in the previous tests

import data1 from '../fixtures/requestsafter.json'; // The data file will drive the tests
import data2 from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';

const testData = [...data1, ...data2]; // Define the testData array
console.log(testData);
console.log('Right One');

describe('Delete Integration Requests', () => {
  beforeEach(() => {
    // Use admin to delete the requests as there might be a mix of requests created by regular user and admin
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    let runOK = true;
    if (Cypress.env('smoketest') && !data.smoketest) {
      runOK = false;
    }
    if (runOK) {
      it(`Delete: ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let req = new Request();
        if (data.delete) {
          req.showCreateContent(data);
          req.id = data.id;
          req.deleteRequest(req.id);
          req = null;
        }
      });
    }
  });
});
