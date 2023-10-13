// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../../appActions/Request";
let table = [];

describe("Read File", () => {
  const req = new Request();
  before(() => {
    cy.fixture("requests.json")
      .then((data) => {
        table = data;
      })
      .then(console.table);
  });

  it("Log value", function () {
    table.forEach((value, index) => {
      cy.log('test_id: ' + value.test_id);
      cy.log('id: ' + value.id);
      cy.log('projectname: ' + value.projectname);
      cy.log('team: ' + value.team);
      cy.log('teamid: ' + value.teamid);
      cy.log('publicaccess: ' + value.publicaccess);
      cy.log('identityprovider: ' + value.identityprovider);
      cy.log('additionalroleattribute: ' + value.additionalroleattribute);
      cy.log('redirecturi: ' + value.redirecturi);
      cy.log('agreeWithTermstrue: ' + value.agreeWithTermstrue);
      cy.log('submit: ' + value.submit);
      cy.log('confirm: ' + value.confirm);
      cy.log('description: ' + value.description);
      cy.log('*********************');

/*       let objIndex;
      objIndex = table.findIndex((obj => obj.test_id == value.test_id ));
      cy.log(objIndex);
      cy.log("Found: " + table[objIndex].projectname); */

      cy.log(index.toString());
      cy.log("Found: " + table[index].projectname);
      table[index].id = "21110000" + index.toString();
      cy.writeFile("cypress/fixtures/requests.json", table);

      cy.log(Cypress.env('test'));
      Cypress.env('test','Test');
      cy.log(Cypress.env('test'));



    });
  });
});
