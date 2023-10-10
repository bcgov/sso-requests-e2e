// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../../appActions/Request";

describe("Create Request", () => {
  const req = new Request();

  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Create Request", function () {
    
    // Initialize Data
    req.id = null;
    req.projectName = null; // faker.company.catchPhrase(); when no value is supplied
    req.team = true;
    req.teamId= "2278";
    req.publicAccess= true;
    req.identityProvider = "IDIR";
    req.additionalRoleAttribute = null;
    req.redirectUri = null; // faker.internet.url(); when no value is supplied
    req.agreeTerms = true;
    req.subMit = true;
    req.conFirm = true;

    req.createRequest();
  });

});
