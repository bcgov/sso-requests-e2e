// Creation of Integration request variants

import data from '../fixtures/requests.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
import Team from '../appActions/Team';
let testData = data;
let tempData = data;
let util = new Utilities();

describe('Create Integration Requests', () => {
  const requests: Request[] = [];

  beforeEach(() => {
    cy.clearAllCookies();
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  const cleanup = () => {
    cy.clearAllCookies();
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    requests.forEach((request) => {
      request.deleteRequest(request.id);
    });
  };

  afterEach(() => {
    cy.logout(null);
  });

  after(() => {
    cleanup();
    // Some integrations create new teams
    const team = new Team();
    team.deleteAllTeams();
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    if (util.runOk(data)) {
      let req = new Request();
      requests.push(req);

      it(`Create ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        req.showCreateContent(data);
        req.populateCreateContent(data);
        req.createRequest();
      });

      it(`Validate creation of ${data.create.projectname}`, () => {
        req.validateRequest(req.id);
      });

      it(`Update ${data.create.projectname}`, () => {
        req.populateUpdateContent(data);
        req.updateRequest(req.id);
      });

      it(`Validate update of ${data.create.projectname}`, () => {
        req.populateUpdateValidationContent(data);
        req.validateRequest(req.id);
      });
    }
  });
});
