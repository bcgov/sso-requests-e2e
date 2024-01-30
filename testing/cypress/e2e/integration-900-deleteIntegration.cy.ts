// Delete Integration request that were created in the previous tests

import data1 from '../fixtures/requestsafter.json'; // The data file will drive the tests
import data2 from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';

const testData = [...data1, ...data2]; // Define the testData array
console.log(testData);
console.log('Right One');

describe('Delete Integration Requests', () => {
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
    it(`Delete: ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
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
