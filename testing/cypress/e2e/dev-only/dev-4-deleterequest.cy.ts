// This spec is used to delete created requests

import Request from '../../appActions/Request';
let table = [];
let temptable = [];
let objIndex;

describe('Delete Request', () => {
  let req = new Request();
  before(() => {
    cy.fixture('createdRequest.json')
      .then((data) => {
        table = data;
      })
      .then(console.table);
  });

  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Delete Request', function () {
    temptable = table;
    cy.wrap(
      table.forEach((value, index) => {
        req = new Request();
        if (req.deleteRequest(value)) {
          // Remove the element from the array
          objIndex = table.findIndex((obj) => obj == value);
          temptable.splice(objIndex, 1);
          cy.log(temptable.toString());
        }
      }),
    ).then(() => {
      cy.writeFile('cypress/fixtures/createdRequest.json', temptable);
    });
  });
});
