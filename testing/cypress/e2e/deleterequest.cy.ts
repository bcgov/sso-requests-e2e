// This spec is used to delete created requests

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

  it("Delete Request", function () {
    table.forEach((value) => {
      req.deleteRequest(value);
    });
  });
});
