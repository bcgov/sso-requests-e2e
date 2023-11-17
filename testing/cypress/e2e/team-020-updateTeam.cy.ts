import { faker } from "@faker-js/faker";
import Team from "../appActions/Team";
let table = [];

describe("Update Team from File", () => {
  before(() => {
    cy.fixture("teams.json")
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

  it("Update Team", function () {
    table.forEach((value, index) => {
      cy.log("Test ID: " + value.update.test_id);
      let team = new Team();
      team.populateUpdateContent(value);
      team.showPopulatedContent();
      if (team.updateTeam()) {
        Cypress.log({
          name: 'Test Result',
          displayName: 'Result',
          message: `${value.update.test_id}, ${"- PASSED"}`,
        })
      }
      else {
        Cypress.log({
          name: 'Test Result',
          displayName: 'Result',
          message: `${value.update.test_id}, ${"- FAILED"}`,
        })
      }
    });
  });
});
