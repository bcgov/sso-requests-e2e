/**
 * Handy utilities for the app
 */
import MD5 from 'crypto-js/md5';

class Utilities {
  runOk(data: any): boolean {
    const isLocalTest = Cypress.env('localtest');
    const isSmokeTest = Cypress.env('smoketest');

    // Directly return the evaluation based on conditions
    if (!isLocalTest && !isSmokeTest) {
      // If neither localtest nor smoketest is set, always return true
      return true;
    } else if (isLocalTest && isSmokeTest) {
      // If both flags are set, check corresponding data properties
      return data.localtest && data.smoketest;
    } else if (isLocalTest) {
      // If only localtest is set, check the localtest data property
      return data.localtest;
    } else if (isSmokeTest) {
      // If only smoketest is set, check the smoketest data property
      return data.smoketest;
    }

    // Default return should never be reached due to logic above covering all cases,
    // but it's good practice to have a fallback return in case the function logic evolves.
    return false;
  }
  md5(data: string): string {
    return MD5(data).toString();
  }
}
export default Utilities;
