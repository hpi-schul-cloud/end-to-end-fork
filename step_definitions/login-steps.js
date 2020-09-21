
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');


Then(/^the teacher-dashboard should have an icon with the teacher's initials$/,function() {
		return loginPage.loginResult();
});


Then(
	/^user-dashboard should have the correct initials$/, function() {
		return loginPage.loginResult();
});

Then(
	/^dashboard should have the correct school$/, function() {
		return DashboardPage.loginSchool();
});

Then(
	/^dashboard should have the correct name and profession$/, function() {
		return DashboardPage.loginFullUserInfo();
});

Then(/^dashboard should have the following tabs$/, function (LoginTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, loginPage.selectors.loginTabs);
});


Then(/^a user should see a notification$/, function() {
	return loginPage.wrongLoginResult();
});

