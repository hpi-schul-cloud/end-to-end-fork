const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/login`,

  deafultTeacherUsername: 'klara.fall@schul-cloud.org',
  defaultTeacherpassword: 'Schulcloud1!',
  eligiblePupilUsername: 'demo-schueler@schul-cloud.org',
  eligiblePupilPassword: 'schulcloud',
  notEligiblePupilUsername: 'paula.meyer@schul-cloud.org',
  notEligiblePupilPassword: 'Schulcloud1!',

  elem: {
    usernameInput: 'section#loginarea input[data-testid=\'username\']',
    passwordInput: 'section#loginarea input[data-testid=\'password\']',
    loginBtn: 'section#loginarea input[data-testid=\'submit-login\']',
    resultInitials: '.avatar-circle .initials',
    icon: 'span[data-testid=\'initials\']',
    settings: 'a[data-testid=\'settings\']',
    logout: 'a[data-testid=\'logout\']'

  }
};
