// Validate Integration request variants

import data from '../fixtures/requestsafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;

describe('Validate Integration Requests', () => {
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
    if (util.runOk(data)) {
      it(`Validate: ${data.update.projectname} (Test ID: ${data.update.test_id}) - ${data.update.description}`, () => {
        let req = new Request();
        req.showUpdateContent(data);
        // Fill in the fields with creation data first
        req.populateCreateContent(data);
        // Overlay the update data
        req.populateUpdateValidationContent(data);
        // Validate the Updated request
        req.validateRequest(req.id);
        req = null;
      });
    }
  });
});
