"use strict";
const courseListPage = require("../../../page-objects/pages/coursePages/CRSSCourseListPage");
const coursePage = require("../../../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const elementHelpers = require('../../../runtime/helpers/elementHelpers.js');
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const addNewTopicBtn = "[data-section='js-topics'] .add-button a";
const topicNameContainer = '#topic-list .card-header .topic-label';

async function clickAddNewTopicBtn () {
	await elementHelpers.clickAndWait(addNewTopicBtn);
}

async function clickAddNewTopicInCourse (coursename) {
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await coursePage.openTopicsTab();
	await clickAddNewTopicBtn();
}

async function isTopicInCourseInSection(courseName, topicName, section) {
	await courseListPage.clickOnCourseInSection(courseName, section);
	await waitHelpers.waitUntilElementIsVisible(topicNameContainer);
	const listOfTopics = await driver.$$(topicNameContainer);
	const listOfTopicNames = await elementHelpers.getTextListFromListOfElements(listOfTopics);
	const msg = "Topic with name: '" + courseName + "' is not visible on list \n";
	const resultMsg = 'Expected: ' + topicName + ', Actual: ' + listOfTopicNames;
	expect(listOfTopicNames, msg + resultMsg).to.include(topicName);
}

module.exports = {
	isTopicInCourseInSection,
	clickAddNewTopicBtn,
	clickAddNewTopicInCourse,
}
