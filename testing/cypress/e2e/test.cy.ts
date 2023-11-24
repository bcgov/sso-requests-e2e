// Update of Integration request variants

import data from '../fixtures/requests.json'; // The data file will drive the tests
import Request from '../appActions/Request';
import RequestPage from '../pageObjects/requestPage';

let testData = data;

describe('Integration Requests Roles', () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  let req = new Request();
  let reqPage = new RequestPage();

  /* ==== Test Created with Cypress Studio ==== */
  it('Add Roles', function () {
    cy.contains('td', '00009840').parent().click();
    cy.get(reqPage.tabTechDetails).click();
    cy.get(reqPage.tabRoleManagement).click();
    cy.get(reqPage.createRoleButton).click();
    cy.get(reqPage.roleNameInputField).first().clear().type('test1');
    cy.get('span > svg > title').contains('Add Role').parent().click();
    cy.get(reqPage.roleNameInputField).eq(1).clear().type('test2');
    //cy.get('input[role="combox"]').select("dev");
    cy.get(reqPage.confirmCreateNewRole).click({
      force: true,
    });
    cy.get(reqPage.tabUserRoleManagement)
      .click()
      .then(() => {
        cy.wait(2000);
        reqPage.setRoleEnvironment('Dev');
        reqPage.setRoleIdp('IDIR');
        reqPage.setRoleCriterion('First Name');
        reqPage.setRoleSearch('roland');
        reqPage.setRolePaging('15');
        reqPage.setRolePickUser('Roland');
        reqPage.setRoleAssignSelect('test1');
      });
    cy.get(reqPage.tabTechDetails).click();
  });
});
