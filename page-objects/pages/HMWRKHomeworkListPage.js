/*[url/homework]*/
'use strict';
const {CLIENT} = require("../../shared-objects/servers");
const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');

const urlHomework = `${CLIENT.URL}/homework`;
const createTaskButton = "a[href='/homework/new']";
 

module.exports = {
	goToHomeworkListPage: async function () {
		await elementHelpers.loadPage(urlHomework, 20);
	},

	clickCreateTaskButton: async function() {
		await waitHelpers.waitAndClick(createTaskButton);
	},

	sortHometasks: async function () {
		let sortBtn = await driver.$(
			'#filter > div > div.md-chip.md-theme-default.md-deletable.md-clickable > div'
		);
		await sortBtn.click();
		let select = await driver.$('#selection-picker > div > div');
		await select.click();
		let lastedited = await driver.$('body > div.md-select-menu.md-menu-content-bottom-start.md-menu-content-small.md-menu-content.md-theme-default > div > ul > li:nth-child(2) > button'
		);
		await lastedited.click();
		let ok = await driver.$('.md-button.md-primary.md-theme-default > div > div');
		await ok.click();
		await driver.pause(1500);
	},
	returnTaskChildIndex: async function (taskname) {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks) {
			const containerWithTasks = await driver.$('.col-xl-12');
			let numOfElems = await containerWithTasks.$$('li');
			for (var i = 1; i < numOfElems.length; i++) {
				let nameOfTheTaskSelector = await driver.$('.col-xl-12 > li:nth-child(' + i + ') > .content > h2');
				let nameOfTheTask = await nameOfTheTaskSelector.getText();
				if (await nameOfTheTask.includes(taskname)) {
					return i ;
				}
			}

		};
		return 0;
	},
	
	chooseTaskAmongAllTasks: async function (taskname) {
		let taskindex = await this.returnTaskChildIndex(taskname);
		if (taskindex > 0 ) {
			let task = await driver.$('.col-xl-12 > li:nth-child(' + taskindex + ') > a > span.more');
			await task.click();
			await driver.pause(1500);
			let selectorToBeLoaded = await driver.$('#page-title');
			await selectorToBeLoaded.waitForExist(2000);

		} else {
			console.log("No such task was found");
		}
	},

	verify: async function (taskname) {
		await this.goToHomeworkListPage();
		await this.sortHometasks();
		await this.chooseTaskAmongAllTasks(taskname);
		let pageTitleSelector = await driver.$('#page-title');
		let courseAndTaskName = await pageTitleSelector.getText();
		let tasknameArray = await courseAndTaskName.split("- ");
		let foundtaskName = tasknameArray[1];
		await expect(taskname).to.equal(foundtaskName);
	},

	areThereAnyTasks: async function () {
		let elementWithTasks = await driver.$$('.col-xl-12');
		return elementWithTasks.length > 0 ? true : false;
	},

	privateTaskVerify: async function () {
		let areThereAnyTasks = await this.areThereAnyTasks();
		if (areThereAnyTasks == true) {
			let taskNames = await Promise.all(
				(await driver.$$('#homeworks > ol > div > li > a')).map(async (element) => await element.getText()),
			);
			await expect(taskNames).not.to.include(taskname);
			return;
		}
		await expect(areThereAnyTasks).to.be.false;
	},

	userFindsTheTask: async function (taskname) {
		let areThereAnyTasks = await driver.$$('#homeworks > ol > div > li');
		await expect(areThereAnyTasks.length).not.to.equal(0);
		for (var i = 1; i <= areThereAnyTasks.length; i++) {
			let taskSelector = await driver.$('#homeworks > ol > div > li:nth-child(' + i + ') .h5.title');
			let tasknameOnPage = await taskSelector.getText();
			if (tasknameOnPage == taskname) {
				await taskSelector.click();
				await driver.pause(1000);
			}
		}
	},
};

