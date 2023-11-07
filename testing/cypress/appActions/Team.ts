import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import TeamPage from "../pageObjects/teamPage";
const regex = new RegExp(
  "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
);

class Team {
  teamPage = new TeamPage();

  teamName: string;
  userRole: string[];
  userEmail: string[];

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

  updateTeam(teamName: string) {}

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
            .find("button")
            .contains("Delete Team")
            .click({ force: true });
          cy.wait(2000);
          i++;
          n++;
        }
      });
  }

  AddNewTeamMember() {
    cy.get("button").contains("+ Add a New Team Member").click();
    cy.get(this.teamPage.modalAddMember)
      .should("be.visible")
      .then(() => {});
  }

  populateCreateContent(value: any) {
    this.teamName = value.create[0].teamname;
    this.userRole = value.create[0].userrole;
    this.userEmail = value.create[0].useremail;
  }
  showPopulatedContent() {
    cy.log("this.teamName: " + this.teamName);
    cy.log("this.userRole: " + this.userRole);
    cy.log("this.userEmail: " + this.userEmail);
  }



}
export default Team;
