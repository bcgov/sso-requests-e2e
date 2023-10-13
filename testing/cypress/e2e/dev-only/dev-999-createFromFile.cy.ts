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

  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Log value", function () {
    table.forEach((value, index) => {
      cy.log("test_id: " + value.test_id);
      cy.log("id: " + value.id);
      cy.log("projectname: " + value.projectname);
      cy.log("team: " + value.team);
      cy.log("teamid: " + value.teamid);
      cy.log("publicaccess: " + value.publicaccess);
      cy.log("identityprovider: " + value.identityprovider);
      cy.log("additionalroleattribute: " + value.additionalroleattribute);
      cy.log("redirecturi: " + value.redirecturi);
      cy.log("agreeWithTermstrue: " + value.agreeWithTermstrue);
      cy.log("submit: " + value.submit);
      cy.log("confirm: " + value.confirm);
      cy.log("description: " + value.description);
      cy.log("*********************");

      req.id = null;
      req.projectName = value.projectname; // faker.company.catchPhrase(); when no value is supplied
      req.usesTeam = value.team;
      req.teamId = value.teamid;
      req.publicAccess = value.publicaccess;
      req.identityProvider = value.identityprovider;
      req.additionalRoleAttribute = null;
      req.redirectUri = null; // faker.internet.url(); when no value is supplied
      req.agreeWithTerms = value.agreeWithTermstrue;
      req.subMit = value.submit;
      req.conFirm = value.confirm;

      cy.log(value.test_id + ": " + value.description);
      cy.wrap(req.createRequest()).then(() => {
        cy.log("New Request: " + Cypress.env("test"));
        table[index].id = Cypress.env("test");
        cy.writeFile("cypress/fixtures/requests.json", table);
      });
    });
  });
});
