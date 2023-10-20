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
      cy.log("test_id: " + value.update[0].test_id);
      cy.log("projectname: " + value.update[0].projectname);
      cy.log("team: " + value.update[0].team);
      cy.log("teamid: " + value.update[0].teamid);
      cy.log("publicaccess: " + value.update[0].publicaccess);
      cy.log("protocol: " + value.update[0].protocol);
      cy.log("authtype: " + value.update[0].authtype);
      cy.log("identityprovider: " + value.update[0].identityprovider);
      cy.log("additionalroleattribute: " + value.update[0].additionalroleattribute);
      cy.log("redirecturi: " + value.update[0].redirecturi);
      cy.log("redirecturitest: " + value.update[0].redirecturitest);
      cy.log("redirecturiprod: " + value.update[0].redirecturiprod);
      cy.log("displayheader: " + value.update[0].displayheader);
      cy.log("displayheadertest: " + value.update[0].displayheadertest);
      cy.log("displayheaderprod: " + value.update[0].displayheaderprod);
      cy.log("Environments: " + value.update[0].environments);
      cy.log("agreeWithTermstrue: " + value.update[0].agreeWithTermstrue);
      cy.log("submit: " + value.update[0].submit);
      cy.log("confirm: " + value.update[0].confirm);
      cy.log("description: " + value.update[0].description);

      req.id = value.id;
      req.projectName = value.update[0].projectname; // faker.company.catchPhrase(); when no value is supplied
      req.usesTeam = value.update[0].team;
      req.teamId = value.update[0].teamid.toString();
      req.projectLead = value.update[0].projectlead;
      req.publicAccess = value.update[0].publicaccess;
      req.protocol = value.update[0].protocol;
      req.authType = value.update[0].authtype;
      req.identityProvider = value.update[0].identityprovider;
      req.additionalRoleAttribute = value.update[0].additionalroleattribute;
      req.devValidRedirectUris = value.update[0].redirecturi;
      req.testValidRedirectUris = value.update[0].redirecturitest;
      req.prodValidRedirectUris = value.update[0].redirecturiprod;
      req.devDisplayHeaderTitle = value.update[0].displayheader;
      req.testDisplayHeaderTitle = value.update[0].displayheadertest;
      req.prodDisplayHeaderTitle = value.update[0].displayheaderprod;
      req.environments = value.update[0].environments;
      req.subMit = value.create[0].submit;
      req.conFirm = value.create[0].confirm;

      cy.log(value.test_id + ": " + value.description);
      req.updateRequest(req.id);
    });
  });
});
