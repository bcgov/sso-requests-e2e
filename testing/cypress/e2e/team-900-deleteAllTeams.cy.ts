import Team from "../appActions/Team";

describe("Delete All Teams", () => {
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
