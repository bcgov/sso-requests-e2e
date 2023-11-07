class TeamPage {
  path: string = "/my-dashboard/teams";

  addiEmail: string = 'input[type="email"][data-testid="addi-email"]';
  confirmDelete: string = 'button[data-testid="confirm-delete"]';
  editTeamButton: string = '[data-testid="edit-team-button"]';
  deleteTeamButton: string = '[data-testid="delete-team-button"]';
  teamName: string = '[data-testid="team-name"]';
  sendInvitation: string = 'button[data-testid="send-invitation"]';
  modalCancelBtn: string = 'button[data-testid^="modal-cancel-btn"]';
  modalConfirmBtn: string = 'button[data-testid^="modal-confirm-btn"]';
  modalCreateTeam: string = "#create-team-modal";
  modalDeleteTeam: string = "#delete-team-modal";
  modalAddMember: string = "#add-member-modal";
  deleteUser: string = '[data-testid="delete-user-role"]';
  addUser: string = '[data-testid="add-user-role"]';
  userEmail: string = '[data-testid="user-email"]';
  userRole: string = '[data-testid="user-role"]';
  deleteUserRole: string = '[data-testid="delete-user-role"]';

  startTeam() {
    cy.visit(this.path);
    cy.get("button").contains("+ Create a New Team").should("be.visible");
  }

  getFirstTeamName(): string {
    let name: string;
    cy.get("table")
      .first()
      .then(($name) => {
        name = $name.text();
      });
    return name;
  }
}

export default TeamPage;