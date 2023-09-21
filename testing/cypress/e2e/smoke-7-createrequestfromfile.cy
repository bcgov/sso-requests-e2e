// This spec is used to navigate to the request detail page for a specific request.
// It is used to verify that the request detail page is not broken and to verify that basic navigation is possible.

import Request from "../appActions/Request";
import neatCSV = require("neat-csv");

describe("Create Request from file", () => {
  const req = new Request();
  let table = new Array();

  before(() => {
    cy.fixture("requests.csv")
      .then(neatCSV)
      .then((data) => {
        table = data;
      });
      //.then(console.table);
  });

  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  //table.forEach((tableRow) => {
    it("Create Request", () => {
      cy.log("Table Content :");
      console.table;
    });
  //});

  /*   table.forEach(tableRow => {
    it("Create Request: ${tableRow}", () => {
      req.id = tableRow["id"];
      req.projectName = tableRow["projectname"];
      req.team = tableRow["team"];
      req.teamId = tableRow["teamid"];
      req.publicAccess = tableRow["publicaccess"];
      req.identityProvider = tableRow["identityprovider"];
      req.additionalRoleAttribute = tableRow["additionalroleattribute"];
      req.redirectUri = tableRow["redirecturi"];
      req.agreeTerms = tableRow["agreetermstrue"];
      req.subMit = tableRow["submit"];
      req.conFirm = tableRow["confirm"];

      req.createRequest();
    });
  }); */
});
