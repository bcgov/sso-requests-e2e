class HomePage {
    path: string = "/sso-requests-sandbox"
  
    clickLoginButton(){
      cy.get("button").contains("Log in").click()
    }
  } 
  
  export default HomePage;