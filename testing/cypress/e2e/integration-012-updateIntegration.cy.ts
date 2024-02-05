// Update of Integration request variants

import data from '../fixtures/requestsafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Update Integration Requests', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
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
      it(`Update ${data.update.projectname} (Test ID: ${data.update.test_id}) - ${data.update.description}`, () => {
        let req = new Request();
        req.showUpdateContent(data);
        req.populateUpdateContent(data);
        req.updateRequest(req.id);
        req = null;
      });
    }
  });
});
