// Delete all teams. Created teams all have a UUID in the name.
// By scanning for that pattern we'll find all teams and can then delete them.

import Team from '../appActions/Team';

describe('Delete All Teams', () => {
  let team = new Team();
  beforeEach(() => {
    if (cy.setid(null)) {
      cy.login(null, null, null, null);
    }
  });
  afterEach(() => {
    cy.logout(null);
  });

  it('Delete All Teams', function () {
    team.deleteAllTeams();
  });
});
