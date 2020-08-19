
const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');
const DashboardPage = require('../page-objects/pages/DashboardPage');
const common = require('../shared_steps/common-steps.js');

/*Then(/^pupil accepts data security, checks the email (.*) and sets password (.*) .$/, function (username, password) {
	return firstLogin.firstLoginPupilFullAge(username, password);
});*/

Then(/^a pupil should see the dashboard$/, function () {
	return loginPage.loginResult();
});



/*
Then(/^the teacher should accept the data protection$/, function() {
	return firstLogin.firstLoginAdminOrTeacher();
});*/

Then(/^the teacher-dashboard should have an icon with the teacher's initials$/,function() {
		return loginPage.loginResult();
	}
);
/*
Then(
	/^the user is supposed to accept the data protection agreement$/,
	function() {
		return firstLogin.firstLoginAdminOrTeacher();
	}
);*/

Then(
	/^the admin-dashboard should have the admin initials$/,
	function() {
		return loginPage.loginResult();
	}
);

Then(
	/^the admin-dashboard should have the correct school$/,
	function() {
		return DashboardPage.loginSchool();
	}
);

Then(
	/^the admin-dashboard should have the admin name and profession$/,
	function() {
		return DashboardPage.loginInitials();
	}
);

Then(/^the admin-dashboard should have the following tabs$/, function (LoginTextLabels) {
    return DashboardPage.checkIfTabsAreVisible(LoginTextLabels, loginPage.loginTabs.loginTabs);
	}
);




Then(/^a user should see a notification$/, function() {
	return loginPage.wrongLoginResult();
});

Then(/^the login-page should look like it looked before for (.*)$/, function(
	username
) {
	let filename = 'failed-login-page';
	return loginData.compareScreenshots(filename);
});
