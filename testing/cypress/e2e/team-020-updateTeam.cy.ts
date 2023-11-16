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
      let team = new Team();
      team.populateUpdateContent(value);
      team.showPopulatedContent();
      team.updateTeam();
    });
  });
});
