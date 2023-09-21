var signUpData = [];

describe("Data driven testing Demo", () => {

  before(() => {
    cy.fixture("example").then((data) => {
      signUpData = data;
    });
  });

  it("Dummy entry", function () {
    cy.log("dummy test");
    cy.log(signUpData[0].fullname);
  });

  for (let i = 0; i < signUpData.length; i++)  {
    it("${JSON.stringify(this.signUpData[i])}", function () {
      cy.log(signUpData[0].fullname);
      cy.log(signUpData[0].email);
      cy.log(signUpData[0].password);
    });
    };
});
