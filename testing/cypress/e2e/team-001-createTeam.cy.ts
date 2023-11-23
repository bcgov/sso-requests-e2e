// Creation of team variants

import data from "../fixtures/teams.json"; // The data file will drive the tests
import Team from "../appActions/Team";
let testData = data;

describe("Create Teams", () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    it(`Create "${data.create.teamname}" (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
      let team = new Team();
      team.populateCreateContent(data);
      team.showPopulatedContent();
      team.createTeam();
    });
  });
});