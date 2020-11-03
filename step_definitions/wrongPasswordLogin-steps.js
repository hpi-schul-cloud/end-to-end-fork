'use strict';

const loginPage = require('../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');
const startPage = require('../page-objects/pages/generalPagesBeforeLogin/StartPageBeforeLogin.js');
const common = require('../shared_steps/common-steps.js');

When(/^a user puts in '([^']*)' and the wrong '([^']*)' and click the login-button$/,async function(username, password) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(username, password);
});

