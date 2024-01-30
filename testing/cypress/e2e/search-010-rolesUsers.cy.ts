// Update of Integration request variants

import data from '../fixtures/rolesusers.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import RequestPage from '../pageObjects/requestPage';
let testData = data;

describe('Search Users', () => {
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
    it(`Search for user: "${value.id}": ${value.environment} - ${value.idp} - ${value.criterion}`, () => {
      let reqPage = new RequestPage();
      let req = new Request();
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
      req.searchUser(value.id, value.environment, value.idp, value.criterion, value.error, searchValue);
      req = null;
    });
  });
});
