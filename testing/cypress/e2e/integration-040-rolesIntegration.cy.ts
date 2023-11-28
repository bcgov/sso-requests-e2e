// Update of Integration request variants

import data from '../fixtures/requests copy.json'; // The data file will drive the tests
import Request from '../appActions/Request';
let testData = data;
let n = 0;

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
    let req = new Request();
    //req.showCreateContent(data);
    //req.populateCreateContent(data);
    // Only run when there is actual specs for this
    console.log(data.devroles);
    console.log(data.devroles.add);
    console.log(data.devroles.add[n]);
    if (data.devroles) {
      if (data.devroles.add) {
        while (data.devroles.add[n]) {
          it(`Add Roles ${data.create.projectname} (Test ID: ${data.devroles.add[n].test_id}) - ${data.devroles.add[n].description}`, () => {
            console.log(data.devroles);
            console.log(data.devroles.add);
            console.log(data.devroles.add[n]);
            req.addRole(data.id.toString(), data.devroles.add[n].role, 'dev');
          });
          n++;
        }
      }
    }
    req = null;
  });
});
