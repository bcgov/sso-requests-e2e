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
    cy.get('#rc-tabs-2-tab-test').click();
    cy.wait(2000);
    cy.get(reqPage.createRoleButton).click();
    cy.wait(2000);
    cy.get(reqPage.roleNameInputField).first().clear().type('test5');
    cy.get('input#react-select-2-input').clear().type('test{enter}');
    cy.wait(5000);
    cy.get(reqPage.confirmCreateNewRole).click({
      force: true,
    });
    cy.get(reqPage.tabUserRoleManagement)
      .click()
      .then(() => {
        cy.wait(2000);
        reqPage.setRoleEnvironment('Test');
        reqPage.setRoleIdp('IDIR');
        reqPage.setRoleCriterion('First Name');
        reqPage.setRoleSearch('roland');
        reqPage.setRolePaging('15');
        reqPage.setRolePickUser('Roland');
        cy.wait(5000);
        reqPage.setRoleAssignSelect('test5');
        cy.wait(5000);
      });
    cy.get(reqPage.tabTechDetails).click();
  });
});
