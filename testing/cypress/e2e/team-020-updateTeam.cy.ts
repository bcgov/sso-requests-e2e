// Updates of team variants

import data from '../fixtures/teams.json'; // The data file will drive the tests
import Team from '../appActions/Team';
let testData = data;

describe('Update Teams', () => {
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and update a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    it(`Update to "${data.update.teamname}" (Test ID: ${data.update.test_id}) - ${data.update.description}`, () => {
      let team = new Team();
      team.populateUpdateContent(data);
      team.showPopulatedContent();
      team.updateTeam();
    });
  });
});
