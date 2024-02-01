const filePath = 'cypress/fixtures/createdRequest.json';
// The content to write to the file if it doesn't exist
const fileContent = [];

describe('My Cypress Test', () => {
  it('should visit the homepage', () => {
    cy.task('checkFileExists', filePath).then((exists) => {
      if (!exists) {
        // File doesn't exist, so create it
        cy.writeFile(filePath, fileContent);
      }
    });
  });
});
