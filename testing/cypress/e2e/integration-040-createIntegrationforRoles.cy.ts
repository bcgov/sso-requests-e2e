// Creation of Integration request variants

import data from '../fixtures/requests-roles.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;
let tempData = data;

describe('Create Integration Requests for Roles Testing', () => {
  before(() => {
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

  after(() => {
    cy.writeFile('cypress/fixtures/requests-rolesafter.json', tempData);
    cy.cleanGC();
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let req = new Request();
        req.showCreateContent(data);
        req.populateCreateContent(data);
        cy.wrap(req.createRequest()).then(() => {
          tempData[index].id = Cypress.env(util.md5(data.create.projectname));
        });
      });
    }
  });
});
