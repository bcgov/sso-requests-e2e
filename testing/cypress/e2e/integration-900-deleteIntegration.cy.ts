// Delete Integration request that were created in the previous tests

import data from "../fixtures/requestsafter.json"; // The data file will drive the tests
import Request from "../appActions/Request";
let testData = data;

describe("Delete Integration Requests", () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    it(`Delete: ${data.update[0].projectname} (Test ID: ${data.create[0].test_id}) - ${data.create[0].description}`, () => {
      let req = new Request();
      if (data.delete) {
        req.showCreateContent(data);
        req.id = data.id;
        req.deleteRequest(req.id);
        req = null;
      }
    });
  });
});
