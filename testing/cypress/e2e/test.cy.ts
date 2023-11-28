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
    req.addRole('00009840', 'test5', 'test');
    req.addUsertoRole('00009840', 'test5', 'test', 'Roland');
    cy.get(reqPage.tabTechDetails).click();
  });
});
