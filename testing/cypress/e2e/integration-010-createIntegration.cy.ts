// Creation of Integration request variants

import data from '../fixtures/requests.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let testData = data;
let tempData = data;
let util = new Utilities();

describe('Create Integration Requests', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  const cleanup = () => {
    const req = new Request();
    cy.clearAllCookies();
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    req.deleteAllRequests();
    cy.logout(null);
  };

  afterEach(() => {
    cy.logout(null);
  });

  before(() => {
    cleanup();
  });
  after(() => {
    cleanup();
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    if (util.runOk(data)) {
      let req = new Request();

      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        req.showCreateContent(data);
        req.populateCreateContent(data);
        cy.wrap(req.createRequest()).then(() => {
          tempData[index].id = Cypress.env(util.md5(data.create.projectname));
        });
      });

      it(`Validate creation of ${data.create.projectname}`, () => {
        req.validateRequest(data.id);
      });

      it(`Update ${data.create.projectname}`, () => {
        req.populateUpdateContent(data.id);
        req.updateRequest(data.id);
      });

      it(`Validate update of ${data.create.projectname}`, () => {
        req.populateUpdateValidationContent(data);
        data.id;
        req.updateRequest(data.id);
        req.validateRequest(req.id);
      });
    }
  });
});
