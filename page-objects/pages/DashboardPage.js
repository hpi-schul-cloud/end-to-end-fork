/*[url/dashboard]*/
'use strict';

const { CLIENT } = require("../../shared-objects/servers");
const navigationTopPage = require('../../page-objects/pages/NavigationTopPage');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const apiHelpers = require('../../runtime/helpers/APIhelpers');
const loginPage = require('../../page-objects/pages/generalPagesBeforeLogin/LoginPage.js');

const dashboardUrl = `${CLIENT.URL}/dashboard`;
const dashboardTitle = 'Übersicht';
const dashboardHeader = '#titlebar h1#page-title';

module.exports = {
	goToDashboard: async function () {
		await elementHelpers.loadPage(dashboardUrl, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function () {
		await this.goToDashboard();
		expect(await elementHelpers.getElementText(dashboardHeader)).to.equal(dashboardTitle);
	},

	loginInitials: async function () {
		let initials = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function () {
		await this.goToDashboard();
		let schoolNameProvidedByAPI = await apiHelpers.getSchoolName();
		//TODO:loginPage.schoolNameSelector
		expect(await elementHelpers.getElementText(loginPage.schoolNameSelector)).to.equal(schoolNameProvidedByAPI);
	},

	loginFullUserInfo: async function () {
		let userName = await apiHelpers.getInitials();
		expect(await elementHelpers.getElementText(navigationTopPage.initialsDDCurrentUser).to.equal(userName));
	},

	checkIfTabsAreVisible: async function (itemsToCompare, selector) {
		let items = await driver.$$(selector);
		let expectations = itemsToCompare.hashes();
		for (let i = 0; i < items.length; i++) {
			let actualLabelText = await items[i].getText();
			await items[i].waitForEnabled(DELAY_100_MILLISECOND);
			expect(actualLabelText).to.equal(expectations[i].tabs);
		}
	},
}
