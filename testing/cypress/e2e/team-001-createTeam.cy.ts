// Creation of team variants

import data from '../fixtures/teams.json'; // The data file will drive the tests
import Team from '../appActions/Team';
import Utilities from '../appActions/Utilities';
let util = new Utilities();
let testData = data;

describe('Create Teams', () => {
  // before(() => {
  //   cy.cleanGC();
  // });
  // after(() => {
  //   cy.cleanGC();
  // });

  const team = new Team();
  const cleanup = () => {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
    team.deleteAllTeams();
    cy.logout(null);
  };

  before(() => {
    cleanup();
  });

  after(() => {
    cleanup();
  });

  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  afterEach(() => {
    cy.logout(null);
  });

  // Iterate through the JSON file and create a team for each entry
  // The set up below allows for reporting on each test case
  testData.forEach((data, index) => {
    // Only run the test if the smoketest flag is set and the test is a smoketest
    if (util.runOk(data)) {
      it(`Create "${data.create.teamname}" (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let team = new Team();
        team.populateCreateContent(data);
        team.showPopulatedContent();

        team.createTeam();
        team.updateTeam();
      });
    }
  });
});
