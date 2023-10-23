// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../appActions/Request";
let table = [];

describe("Read File", () => {
  const req = new Request();
  before(() => {
    cy.fixture("requestcomplete.json")
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
      cy.log("id: " + value.id);
      cy.log("test_id: " + value.create[0].test_id);
      cy.log("projectname: " + value.create[0].projectname);
      cy.log("team: " + value.create[0].team);
      cy.log("teamid: " + value.create[0].teamid);
      cy.log("publicaccess: " + value.create[0].publicaccess);
      cy.log("protocol: " + value.create[0].protocol);
      cy.log("authtype: " + value.create[0].authtype);
      cy.log("identityprovider: " + value.create[0].identityprovider);
      cy.log("additionalroleattribute: " + value.create[0].additionalroleattribute);
      cy.log("redirecturi: " + value.create[0].redirecturi);
      cy.log("redirecturitest: " + value.create[0].redirecturitest);
      cy.log("redirecturiprod: " + value.create[0].redirecturiprod);
      cy.log("displayheader: " + value.create[0].displayheader);
      cy.log("displayheadertest: " + value.create[0].displayheadertest);
      cy.log("displayheaderprod: " + value.create[0].displayheaderprod);
      cy.log("Environments: " + value.create[0].environments);
      cy.log("agreeWithTermstrue: " + value.create[0].agreeWithTermstrue);
      cy.log("submit: " + value.create[0].submit);
      cy.log("confirm: " + value.create[0].confirm);
      cy.log("description: " + value.create[0].description);

      req.id = value.id;
      req.projectName = value.create[0].projectname; // faker.company.catchPhrase(); when no value is supplied
      req.usesTeam = value.create[0].team;
      req.teamId = value.create[0].teamid.toString();
      req.projectLead = value.create[0].projectlead;
      req.publicAccess = value.create[0].publicaccess;
      req.protocol = value.create[0].protocol;
      req.authType = value.create[0].authtype;
      req.identityProvider = value.create[0].identityprovider;
      req.additionalRoleAttribute = value.create[0].additionalroleattribute;
      req.devValidRedirectUris = value.create[0].redirecturi;
      req.testValidRedirectUris = value.create[0].redirecturitest;
      req.prodValidRedirectUris = value.create[0].redirecturiprod;
      req.devDisplayHeaderTitle = value.create[0].displayheader;
      req.testDisplayHeaderTitle = value.create[0].displayheadertest;
      req.prodDisplayHeaderTitle = value.create[0].displayheaderprod;
      req.environments = value.create[0].environments;
      req.agreeWithTerms = value.create[0].agreeWithTermstrue;
      req.subMit = value.create[0].submit;
      req.conFirm = value.create[0].confirm;

      req.validateRequest(req.id);
    });
  });
});
