/**
 * This file contains a Cypress test that checks if the current time is greater than a given time.
 * It also generates a UUID and logs it to the console.
 */
import * as dayjs from "dayjs";

describe("template spec", () => {
  it("passes", () => {
    const time = "5:03:48 PM";
    const rightNow = dayjs().format("h:mm:ss A");
    cy.log(rightNow);
    if (rightNow > time) {
      cy.log("Time is correct");
    }

    cy.generateUUID().then((uuid) => {
      cy.log(uuid);
    });
  });
});
