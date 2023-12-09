// Update of Integration request variants

import data from '../fixtures/rolesusers.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import RequestPage from '../pageObjects/requestPage';
let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Remove Roles
  testData.forEach((value, index) => {
    it(`Search for user ${value.id}: ${value.environment} - ${value.idp} - ${value.criterion}`, () => {
      let reqPage = new RequestPage();
      let req = new Request();

      cy.log(value.id.toString());
      cy.log(value.environment);
      cy.log(value.idp);
      cy.log(value.criterion);
      cy.log(value.search_value);

      cy.visit(reqPage.path);
      cy.contains('td', value.id).parent().click();
      cy.get(reqPage.tabUserRoleManagement).click();
      cy.wait(2000);
      cy.get(reqPage.tabUserRoleManagement).then(() => {
        reqPage.setRoleEnvironment(value.environment);
        reqPage.setRoleIdp(value.idp);
        reqPage.setRoleCriterion(value.criterion);
        reqPage.setRoleSearch(value.search_value);
        cy.wait(3000);
        if (value.criterion !== 'IDP GUID') {
          reqPage.setRolePickUser(value.search_value);
        }
      });
      req = null;
    });
  });
});
