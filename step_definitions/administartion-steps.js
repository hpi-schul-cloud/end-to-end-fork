'use strict';

const administration = require('../page-objects/apiTest');
const ADMNSTRTNAdministrationOverviewPage = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministrationOverviewPage');
const studentAdministration = require('../page-objects/pages/administrationPages/ADMNSTRTNAdministerStudentsPage');
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
let oldPassword; // the value will be overwritten from AdministerStudentsPage

When(/^admin goes to students administration$/, function() {
	return ADMNSTRTNAdministrationOverviewPage.clickAdministrateStudents();
});

When(/^an admin puts in (.*) and (.*) and (.*) of the new pupil$/, function (firstname, secondname, email) {
	return studentAdministration.createNewPupil(firstname, secondname, email)
});
Then(/^the admin should see new pupil with email (.*) among his pupils$/, function (email) {
	return studentAdministration.verify(email);
});
Then(/^.* manually submits a consent (.*)$/, function (email) {
	return administration.submitConsent(email);
});
Then(/^new pupil (.*) can log in with default password$/, async function (email) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(email, oldPassword);
});


module.exports = {oldPassword}
