// Update of Integration request variants

import data from '../fixtures/requests copy.json'; // The data file will drive the tests
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
    let req = new Request();
    let n = 0;
    console.log(data.devroles);
    console.log(data.devroles.add);
    console.log(data.devroles.add[n]);
    if (data.devroles) {
      if (data.devroles.add) {
        while (n < data.devroles.add.length) {
          const addRoleData = data.devroles.add[n];
          it(`Add Roles ${data.create.projectname} (Test ID: ${addRoleData.test_id}) - ${addRoleData.description}`, () => {
            console.log('in the IT:');
            console.log(data.devroles);
            console.log(data.devroles.add);
            console.log(data.devroles.add[n]);
            console.log(n.toString());
            req.addRole(data.id.toString(), addRoleData.role, 'dev');
          });
          n++;
        }
      }
    }
    req = null;
  });
});
