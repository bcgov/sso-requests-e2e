// Creation of pre-reqs for test

import data from '../fixtures/pre-req.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;

describe('Create Integration Requests', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  after(() => {});

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
      let req = new Request();
      req.showCreateContent(data);
      req.populateCreateContent(data);
      req.createRequest();
    });
  });
});
