import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import TeamPage from "../pageObjects/teamPage";
const regex = new RegExp(
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
);

/**
 * Represents a team and its actions.
 */
class Team {
  teamPage = new TeamPage();

  teamName: string;
  userRole: string[];
  userEmail: string[];

  // For Update Purposes
  teamNameNew: string;
  deleteUser: string[];
  addUser: string[];
  addRole: string[];

  // Actions
  createTeam() {
    this.teamPage.startTeam();
    cy.get("button").contains("+ Create a New Team").click();
    cy.get(this.teamPage.modalCreateTeam)
      .should("be.visible")
      .then(() => {
        let myuuid = uuidv4();
        cy.log("Team Name: " + this.teamName);
        cy.get(this.teamPage.teamName)
          .clear()
          .type(this.teamName + "-" + myuuid);
        if (this.userEmail.length == 0) {
          cy.get(this.teamPage.deleteUserRole).eq(0).click();
        } else {
          let n = 0;
          while (this.userEmail.length > n) {
            if (n > 0) {
              cy.get(this.teamPage.addUser).first().click();
            }
            cy.get(this.teamPage.userEmail).eq(n).type(this.userEmail[n]);
            cy.get(this.teamPage.userRole).eq(n).select(this.userRole[n]);
            n++;
          }
        }
        cy.get(this.teamPage.sendInvitation).click({ force: true }); // or Member
      });
    cy.get(this.teamPage.modalCreateTeam).should("not.be.visible");
  }

  validateTeam(teamName: string) {}

  updateTeam() {
    this.teamPage.startTeam();
    //let regex = RegExp(this.teamName + " Updated-");
    let regex = RegExp(this.teamName + "-");

    cy.get("table > tbody > tr > td:nth-child(1)").each(
      ($elm, index, $list) => {
        // text captured from column1
        let t = $elm.text();
        // matching criteria
        if (regex.test(t)) {
          cy.get("table > tbody > tr").eq(index).click(); // first click to focus and set the row to Active
          if (this.teamNameNew !== "") {
            cy.get(this.teamPage.editTeamButton).eq(index).click(); // Second on to Edit
            cy.wait(1000);
            cy.get(this.teamPage.modalEditTeam)
              .should("be.visible")
              .then(() => {
                this.teamNameNew = this.teamNameNew + "-" + uuidv4();
                cy.get(this.teamPage.editTeamName)
                  .clear()
                  .type(this.teamNameNew);
                cy.get(this.teamPage.saveEditTeamName).click({ force: true }); // or Member
              });
          }

          // Delete User
          if (this.teamNameNew !== "") {
            cy.contains("td", this.teamNameNew).parent().click();
          } else {
            cy.contains("td", this.teamName).parent().click();
          }
          let n = 0;
          while (this.deleteUser.length > n) {
            cy.contains("td", this.deleteUser[n]["useremail"])
              .parent()
              .within(($tr) => {
                cy.get(this.teamPage.deleteMember).click({ force: true }); // clicks the button
              });
            cy.get(this.teamPage.modalDeleteMember)
              .find(this.teamPage.confirmDeleteTeamMember)
              .click({ force: true });
            n++;
          }

          // Add User
          if (this.addUser.length > 0) {
            if (this.teamNameNew !== "") {
              cy.contains("td", this.teamNameNew).parent().click();
            } else {
              cy.contains("td", this.teamName).parent().click();
            }
            cy.get(this.teamPage.addNewTeamMember).click();

            cy.get(this.teamPage.modalAddMember)
              .should("be.visible")
              .then(() => {
                let n = 0;
                while (this.addUser.length > n) {
                  if (n > 0) {
                    cy.get(this.teamPage.addUser).eq(1).click({ force: true });
                  }
                  cy.get(this.teamPage.userEmail)
                    .eq(n)
                    .type(this.addUser[n]["useremail"].toString(), {
                      force: true,
                    })
                    .trigger("input");
                  cy.get(this.teamPage.userEmail)
                    .eq(n + 1)
                    .type(this.addUser[n]["useremail"].toString(), {
                      force: true,
                    })
                    .trigger("input");
                  cy.get(this.teamPage.userRole)
                    .eq(n + 1)
                    .select(this.addUser[n]["userrole"].toString());
                  cy.get(this.teamPage.userRole)
                    .eq(n + 1)
                    .select(this.addUser[n]["userrole"].toString());
                  n++;
                }
                cy.get(this.teamPage.confirmDeleteAddTeamMember).click({
                  force: true,
                }); // or Member
              });
          }
        }
      }
    );
  }

  deleteTeam(teamName: string) {}

  deleteAllTeams() {
    let i = 0;
    let deleteTeams = [];
    let teamPage = new TeamPage();
    cy.visit(this.teamPage.path);
    cy.get("button").contains("+ Create a New Team").should("be.visible");

    cy.get("table > tbody > tr > td:nth-child(1)")
      .each(($elm, index, $list) => {
        // text captured from column1
        let t = $elm.text();
        // matching criteria
        if (regex.test(t)) {
          deleteTeams[i] = index;
          i++;
        }
      })
      .then(() => {
        i = 0;
        let n = 0;
        while (deleteTeams.length > i) {
          cy.get("table > tbody > tr")
            .eq(deleteTeams[i] - n)
            .click(); // first click to focus and set the row to Active
          cy.get(this.teamPage.deleteTeamButton)
            .eq(deleteTeams[i] - n)
            .click(); // Second on to delete
          cy.wait(1000);
          cy.get(this.teamPage.modalDeleteTeam)
            .find(this.teamPage.confirmDeleteTeam)
            .click({ force: true });
          cy.wait(2000);
          i++;
          n++;
        }
      });
  }

  populateCreateContent(value: any) {
    this.teamName = value.create.teamname;
    this.userRole = value.create.userrole;
    this.userEmail = value.create.useremail;
  }

  populateUpdateContent(value: any) {
    this.teamName = value.create.teamname;
    this.teamNameNew = value.update.teamname;
    this.deleteUser = value.update.deleteuser;
    this.addUser = value.update.adduser;
  }

  showPopulatedContent() {
    cy.log("this.teamName: " + this.teamName);
    cy.log("this.userRole: " + this.userRole);
    cy.log("this.userEmail: " + this.userEmail);
    cy.log("this.teamNameNew: " + this.teamNameNew);
    cy.log("this.deleteUser: " + this.deleteUser);
    cy.log("this.addUser: " + this.addUser);
  }
}
export default Team;
