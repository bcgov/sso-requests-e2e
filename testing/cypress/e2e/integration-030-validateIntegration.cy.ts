// Validate Integration request variants

import data from '../fixtures/requestsafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Validate Integration Requests', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    it(`Validate: ${data.create[0].projectname} (Test ID: ${data.create[0].test_id}) - ${data.create[0].description}`, () => {
      let req = new Request();
      req.showCreateContent(data);
      req.populateCreateContent(data);
      req.validateRequest(req.id);
      req = null;
    });
  });
});