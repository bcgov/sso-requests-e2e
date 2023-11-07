import Team from "../appActions/Team";

describe("Create Team", () => {
  let team = new Team();
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Delete All Teams", function () {
    team.deleteAllTeams();
  });
});
