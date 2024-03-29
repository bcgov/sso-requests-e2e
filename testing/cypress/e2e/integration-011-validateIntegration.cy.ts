// Validate Integration request variants

import data from '../fixtures/requestsafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;
let req = new Request();

describe('Validate Integration Requests', () => {
  before(() => {
    cy.cleanGC();
  });
  after(() => {
    cy.cleanGC();
  });

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
      it(`Validate: ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        req.showCreateContent(data);
        cy.log(data.id);
        req.populateCreateContent(data);
        req.validateRequest(data.id);
      });
    }
  });
});
