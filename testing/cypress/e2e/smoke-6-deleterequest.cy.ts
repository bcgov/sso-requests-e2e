// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../appActions/Request";
const requestID = '00008882';

describe("Delete Request", () => {
  const req = new Request();

  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Delete Request", function () {
    req.deleteRequest(requestID);
  });
});
