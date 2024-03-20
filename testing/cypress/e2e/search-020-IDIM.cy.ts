// Searching for Users in the IDIM Search

import data from '../fixtures/idim-search.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;
let req = new Request();

describe('Search IDIM', () => {
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

  /*   afterEach(() => {
    cy.logout(null);
  }); */

  // Remove Roles
  testData.forEach((value, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(value)) {
      it(`Search IDIM: "${value.id}": ${value.environment} - ${value.idp} - ${value.criterion}`, () => {
        cy.log(value.id);
        cy.log(value.environment); //Defaults to Dev
        cy.log(value.idp); // Defaults to IDIR for IDIM
        cy.log(value.criterion);
        cy.log(value.search_value);
        req.searchIdim(value.id, value.environment, value.idp, value.criterion, value.error, value.search_value);
      });
    }
  });
});
