import { faker } from "@faker-js/faker";
import Team from "../appActions/Team";
let table = [];

describe("Create Team from File", () => {
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

  it("Create Team", function () {
    table.forEach((value, index) => {
      let team = new Team();
      team.populateCreateContent(value);
      team.showPopulatedContent();
      team.createTeam();
    });
  });
});
