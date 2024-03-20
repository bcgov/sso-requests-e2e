// Update of Integration request variants

import data from '../fixtures/rolesusers.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;
let req = new Request();

describe('Search Users', () => {
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

  // Remove Roles
  testData.forEach((value, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(value)) {
      it(`Search for user: "${value.id}": ${value.environment} - ${value.idp} - ${value.criterion}`, () => {
        cy.log(value.id);
        cy.log(value.environment);
        cy.log(value.idp);
        cy.log(value.criterion);
        cy.log(value.search_value);

        let searchValue = value.search_value;
        if (value.criterion === 'IDP GUID') {
          // Get the IDP GUID from the environment, we need to store these as secrets in github
          // In our datafile, we store the email address instead of the GUID and we use it for lookup
          const guidObject = Cypress.env('guid');
          searchValue = guidObject[value.search_value];
        }
        //  + '@' + util.getDate()
        req.searchUser(value.id, value.environment, value.idp, value.criterion, value.error, searchValue);
      });
    }
  });
});
