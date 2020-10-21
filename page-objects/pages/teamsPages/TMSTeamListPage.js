/*[url/teams]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";
const teamColor = 'background:#FFAD42';
const teamWrapper = '.sc-card-wrapper';
const titleOfTeam = '.title';
const memberBtn = '.btn-member';
const popupMembers = ".member-modal.in[role='dialog']";
const listOfMembersSel = '#member-modal-body > ol > li';
const section = { teamSection: '.section-teams' };
const teamHeader = '.sc-card-header';
const teamDescription = '.ckcontent';

async function goToTeams() {
	return navigationLeftPage.clickNavItemTeams();
}

async function goToAddTeam() {
	await goToTeams();
	await elementHelpers.clickAndWait(addTeamBtn);
}

async function getListOfTeamNames() {
	await waitHelpers.waitUntilAjaxIsFinished();
	await goToTeams();
	return elementHelpers.getTextFromAllElements(teamNameContainer);
}

async function isTeamOnList(teamName) {
	const listOfTeamNames = await getListOfTeamNames();
	const msg = "Team with name: '" + teamName + "' is not visible on the list \n";
	const resultMsg = 'Expected: ' + teamName + ', Actual: ' + listOfTeamNames;
	expect(listOfTeamNames, msg + resultMsg).to.include(teamName);
}
async function getTeamMemberIcon(teamname) {
	const teamMemberIcon = '.btn-member[' + teamname + ' Teilnehmer 3]';

	if (elementHelpers.isElementPresent(teamMemberIcon)) {
		return true;
	} else return false;
}

async function getTeamWithNameInSection(teamName, section) {
	let index = await getIndexOfGivenTeamInSection(teamName, section);
	const list = await getListOfTeamsInSection(section);
	const element = list[index];
	const headerContainer = await element.$(teamHeader);
	const descriptionContainer = await element.$(teamDescription);
	const membersContainer = await element.$(memberBtn);
	return {
		teamName: await headerContainer.getText(),
		teamDescription: await descriptionContainer.getText(),
		teamColour: (await headerContainer.getCSSProperty('background-color')).parsed.hex.toUpperCase(),
		teamMembersCount: await membersContainer.getText(),
	};
}

async function isTeamDescription(teamName, expectedDescription, section) {
	const team = await getTeamWithNameInSection(teamName, section);
	const actualDescr = team.teamDescription;
	const msg = `Team with name: ${teamName} has wrong description. \n`;
	const resultMsg = `Expected: ${expectedDescription} , Actual: ${actualDescr}`;
	expect(expectedDescription, msg + resultMsg).to.include(actualDescr);
}

async function isTeamColour(teamName, expectedColour, section) {
	const team = await getTeamWithNameInSection(teamName, section);
	const actualColourNumber = team.teamColour;
	const expectedColourNumber = teamColor;
	const msg = `Team with name: ${teamName} has wrong colour. \n`;
	const resultMsg = `Expected: ${expectedColour} , Actual: ${actualColourNumber}`;
	expect(expectedColourNumber, msg + resultMsg).to.include(actualColourNumber);
}

async function isTeamMemberNumber(teamName, expectedNumber, section) {
	const team = await getTeamWithNameInSection(teamName, section);
	const actualNum = team.teamMembersCount;
	const msg = `Team with name: ${teamName} has wrong member number. \n`;
	const resultMsg = `Expected: ${expectedNumber} , Actual: ${actualNum}`;
	expect(expectedNumber, msg + resultMsg).to.include(actualNum);
}

async function getListOfTeamsInSection(section) {
	return elementHelpers.getListOfAllElements(section + ' ' + teamWrapper);
}

async function getListOfTeamTitlesInSection(section) {
	return elementHelpers.getTextFromAllElements(section + ' ' + teamWrapper + ' ' + titleOfTeam);
}

async function getIndexOfGivenTeamInSection(teamName, section) {
	const listOfTeamTitlesForSection = await getListOfTeamTitlesInSection(section);
	var index = listOfTeamTitlesForSection.indexOf(teamName);
	return index;
}

async function getWrapperOfTeamInSection(teamName, section) {
	var index = await getIndexOfGivenTeamInSection(teamName, section);
	const list = await getListOfTeamsInSection(section);
	const errorMsg = "Can't find course: " + teamName + ' in section: ' + section + '\n';
	const resultMsg = 'Actual list of courses: [' + list + ']';
	if (index == -1) throw errorMsg + resultMsg;
	const element = list[index];
	return element;
}
async function getNamesOfMembers() {
	await waitHelpers.waitUntilElementIsVisible(popupMembers);
	await waitHelpers.waitUntilElementIsVisible(listOfMembersSel);
	const listOfMembers = await driver.$$(listOfMembersSel);
	return elementHelpers.getTextListFromListOfElements(listOfMembers);
}

async function areMembersOnTheListInTeamForSection(teamName, members, section) {
	await clickPupilIconInTeamsInSection(teamName, section);
	let names = await getNamesOfMembers();
	const msg = "Members: '" + names + "' should be visible on the list. \n";
	const resultMsg = 'Actual list of members: ' + names;
	expect(names, msg + resultMsg).to.have.members(members);
}

async function clickPupilIconInTeamsInSection(teamName, section) {
	const teamWrapper = await getWrapperOfTeamInSection(teamName, section);
	let pupilIcon = await teamWrapper.$(memberBtn);
	await elementHelpers.clickAndWait(pupilIcon);
}
module.exports = {
	section,
	clickPupilIconInTeamsInSection,
	getListOfTeamTitlesInSection,
	getListOfTeamsInSection,
	getIndexOfGivenTeamInSection,
	getNamesOfMembers,
	getWrapperOfTeamInSection,
	goToTeams,
	goToAddTeam,
	isTeamColour,
	isTeamDescription,
	isTeamOnList,
	isTeamMemberNumber,
	areMembersOnTheListInTeamForSection,
	getTeamMemberIcon,
};
