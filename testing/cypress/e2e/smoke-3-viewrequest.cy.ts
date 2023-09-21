// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../appActions/Request";
let table = [];

describe("Delete Request", () => {
  const req = new Request();
  before(() => {
    cy.fixture("createdRequest.json")
      .then((data) => {
        table = data;
      })
      .then(console.table);
  });

  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("View Request", function () {
    table.forEach((value) => {
      req.viewRequest(value);
    });
  });
});
