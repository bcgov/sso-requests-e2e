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
    cy.get(reqPage.tabRoleManagement)
      .click()
      .then(() => {
        cy.wait(2000);
        /* ==== Generated with Cypress Studio ==== */
        cy.contains('td', 'test1').parent().click();
        cy.wait(5000);

        cy.get('svg > title').contains('Delete').parent().click();
        cy.wait(2000);
      });
    cy.get(reqPage.confirmDeleteRole).click({ force: true });
  });
});
