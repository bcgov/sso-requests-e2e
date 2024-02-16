/**
 * Handy utilities for the app
 */
class Utilities {
  runOk(data: any): boolean {
    let runOK = true;

    const isLocalTest = Cypress.env('localtest');
    const isSmokeTest = Cypress.env('smoketest');

    // Evaluate conditions based on the provided matrix
    if (!isLocalTest && !isSmokeTest) {
      // When both isLocalTest and isSmokeTest are FALSE
      runOK = true;
    } else if (isLocalTest && isSmokeTest) {
      // When both isLocalTest and isSmokeTest are TRUE
      runOK = data.localtest && data.smoketest;
    } else if (isLocalTest) {
      // When only isLocalTest is TRUE (isSmokeTest is implicitly FALSE here)
      runOK = data.localtest;
    } else if (isSmokeTest) {
      // When only isSmokeTest is TRUE (isLocalTest is implicitly FALSE here)
      runOK = data.smoketest;
    }

    return runOK;
  }
}
export default Utilities;
