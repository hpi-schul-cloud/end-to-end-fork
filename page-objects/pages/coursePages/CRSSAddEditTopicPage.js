/*[url/courses]/[courseId]/topics/add] | [url/courses]/[courseId]/topics/edit]*/
'use strict';
const {CLIENT} = require("../../../shared-objects/servers");
const elementHelpers = require("../../../runtime/helpers/elementHelpers");
const waitHelpers = require("../../../runtime/helpers/waitHelpers");

const topicNameInput = ".form-group > .form-control";
const createTopicBtn = ".btn.btn-primary.btn-submit";
const lernStoreUrl = `${CLIENT.URL}/content/?inline=1&isCourseGroupTopic=true`;
const textFieldSel = '.ck-content';
const textBtn = ".btn-group > button:nth-child(1)";
const topicSelector = '#topic-list .card';
const sectionTopicTitleSelector = '.section-title #page-title';
const topicSuccessTextSelector = '.first-topic-success';
//geoGebra:
const geogebraBtn = ".btn-group > button:nth-child(2)";
const titleInput = "input[placeholder='Titel des Abschnitts']";
const geoGebraIdInput = "input[placeholder^='GeoGebra']";
// material:
const materialBtn = ".btn-group > button:nth-child(3)";
const addMaterialBtn = ".btn.btn-secondary.btn-add";
const materialContainerSel = ".div.ajaxcontent > div";
const btnContainerMaterial = ".fa.fa-plus-square";
//etherpad:
const etherpadBtn = ".btn-group > button:nth-child(4)";
const etherpadNameField = "#content-blocks > div > div:nth-child(1) .form-control";
const etherpadDescriptionField = "div:nth-child(2) > textarea";

async function setTopic(topicname) {
	await waitHelpers.waitAndSetValue(topicNameInput, topicname);
}

async function clickCreateTopicButton() {
	await elementHelpers.clickAndWait(createTopicBtn);
}

async function addText(text) {
	await elementHelpers.clickAndWait(textBtn);
	await waitHelpers.waitAndSetValue(textFieldSel, text);
}

async function addGeoGebra(geoGebraTitle, geogebraID) {
	await elementHelpers.clickAndWait(geogebraBtn);
	await waitHelpers.waitAndSetValue(titleInput, geoGebraTitle);
	await waitHelpers.waitAndSetValue(geoGebraIdInput, geogebraID);
}

async function addMaterial() {
	await elementHelpers.clickAndWait(materialBtn);
	await elementHelpers.click(addMaterialBtn);
	// window switch
	await driver.pause(9000);
	//await driver.switchWindow(lernStoreUrl);
	let browsers = await driver.getWindowHandles();
	await driver.switchWindow(browsers[1]);
	let materialContainer = await waitHelpers.waitUntilElementIsPresent(materialContainerSel);
	let btnContainer = await materialContainer.$(btnContainerMaterial);
	await btnContainer.clickAndWait();
}

async function addEtherpad(name, description) {
	await elementHelpers.clickAndWait(etherpadBtn);
	await waitHelpers.waitAndSetValue(etherpadNameField, name);
	await waitHelpers.waitAndSetValue(etherpadDescriptionField, description);
}

async function isTopicCreatedOnTopicList(name) {
	if ((topicTitleList().length) > 0) {
		await expect(topicTitleList.includes(name)).to.equal(true);
	} else {
		return new Error("The list of topics is not created.");
	}
}

async function isItTheFirstTopicAdded() {
	if (topicTitleList().length === 1) {
		await waitHelpers.waitUntilElementIsVisible(topicSuccessTextSelector);
	}

}

async function clickOnTopicWithName(name) {
	let listOfTopicElements = await driver.$$(topicSelector)
	let topicTitleList = await elementHelpers.getTextListFromListOfElements(listOfTopicElements);
	await elementHelpers.clickAndWait(listOfTopicElements[topicTitleList.indexOf(name)]);
}

async function isTopicTitleVisible(name) {
	expect(await elementHelpers.getElementText(sectionTopicTitleSelector)).to.equal(name);
}

async function topicTitleList() {
	return await elementHelpers.getTextListFromListOfElements(await driver.$$(topicSelector));
}

module.exports = {
	setTopic,
	clickCreateTopicButton,
	addText,
	addGeoGebra,
	addMaterial,
	addEtherpad,
	isTopicCreatedOnTopicList,
	isItTheFirstTopicAdded,
	clickOnTopicWithName,
	isTopicTitleVisible,
}
