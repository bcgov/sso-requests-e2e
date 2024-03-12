// Creation of Integration request variants

import data from '../../fixtures/standalone-requests.json';
import Request from '../../appActions/Request';
import Utilities from '../../appActions/Utilities';
let testData = data;
let tempData = data;
let util = new Utilities();

describe('Create Integration Requests', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  before(() => {
    cy.cleanGC();
  });

  after(() => {
    cy.cleanGC();
  });

  testData.forEach((data, i) => {
    if (util.runOk(data)) {
      it(`Creates ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let req = new Request();
        req.populateCreateContent(data);
        req.createRequest();
      });

      it(`Updates ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let req = new Request();
        req.populateCreateContent(data);
        req.updateRequest(req.id);
      });
    }
  });
});
