/*[url/teams]*/
'use strict';

const elementHelpers = require('../../../runtime/helpers/elementHelpers');
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const navigationLeftPage = require('../NavigationLeftPage');
const teamNameContainer = '.tasks .title';
const addTeamBtn = "[data-testid='add-team-btn']";
const addTeamWhenZeroTeamsBtn = "a.btn-add";
const teamColor = 'background:#FFAD42';
const teamWrapper = '.section-teams .sc-card-wrapper';
const teamTitleSel = '.title';
const memberBtn = '.btn-member';
const popupMembers = ".member-modal.in[role='dialog']";
const listOfMembersSel = '#member-modal-body > ol > li';
const teamHeader = '.sc-card-header';
const teamDescription = '.ckcontent';

async function goToTeams() {
	return navigationLeftPage.clickNavItemTeams();
}

async function clickAddTeamBtn() {
	try {
		await elementHelpers.clickAndWait(addTeamBtn);
	} catch (e) {
		await elementHelpers.clickAndWait(addTeamWhenZeroTeamsBtn);
	}
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

async function getTeamWithName(teamName) {
	let index = await getTeamIndex(teamName);
	const list = await getListOfTeams();
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

async function isTeamDescription(teamName, expectedDescription) {
	const team = await getTeamWithName(teamName);
	const actualDescription = team.teamDescription;
	const msg = `Team with name: ${teamName} has wrong description. \n`;
	const resultMsg = `Expected: ${expectedDescription} , Actual: ${actualDescription}`;
	expect(expectedDescription, msg + resultMsg).to.include(actualDescription);
}

async function isTeamColour(teamName, expectedColour) {
	const team = await getTeamWithName(teamName);
	const actualColourNumber = team.teamColour;
	const expectedColourNumber = teamColor;
	const msg = `Team with name: ${teamName} has wrong colour. \n`;
	const resultMsg = `Expected: ${expectedColour} , Actual: ${actualColourNumber}`;
	expect(expectedColourNumber, msg + resultMsg).to.include(actualColourNumber);
}

async function isTeamMemberNumber(teamName, expectedNumber) {
	const team = await getTeamWithName(teamName);
	const actualNum = team.teamMembersCount;
	const msg = `Team with name: ${teamName} has wrong member number. \n`;
	const resultMsg = `Expected: ${expectedNumber} , Actual: ${actualNum}`;
	expect(expectedNumber, msg + resultMsg).to.include(actualNum);
}

async function getListOfTeams() {
	return elementHelpers.getListOfAllElements(teamWrapper);
}

async function getListOfTeamTitles() {
	return elementHelpers.getTextFromAllElements(teamWrapper + ' ' + teamTitleSel);
}

async function getTeamIndex(teamName) {
	const listOfTeamTitlesForSection = await getListOfTeamTitles();
	var index = listOfTeamTitlesForSection.indexOf(teamName);
	return index;
}

async function getWrapperOfTeam(teamName) {
	var index = await getTeamIndex(teamName);
	const list = await getListOfTeams();
	const errorMsg = `Can't find team: ${teamName} \n`;
	const resultMsg = `Actual list of teams: ${list}`;
	if (index == -1) throw errorMsg + resultMsg;
	const element = list[index];
	return element;
}
async function getListOfTeamMembers() {
	await waitHelpers.waitUntilElementIsVisible(popupMembers);
	return elementHelpers.getTextFromAllElements(listOfMembersSel);
}

async function areTeamMembersOnTheList(listOfMembers) {
	let actualListOfTeamMembers = await getListOfTeamMembers();
	listOfMembers = listOfMembers.split(',');
	const msg = `Members: ${actualListOfTeamMembers} should be visible on the list \n`;
	const resultMsg = `Actual list of team members: ${actualListOfTeamMembers}`;
	expect(actualListOfTeamMembers, msg + resultMsg).to.have.members(listOfMembers);
}

async function clickMemberIconInTeam(teamName) {
	const teamWrapper = await getWrapperOfTeam(teamName);
	let pupilIcon = await teamWrapper.$(memberBtn);
	await elementHelpers.clickAndWait(pupilIcon);
}
module.exports = {
	clickMemberIconInTeam,
	goToTeams,
	clickAddTeamBtn,
	isTeamColour,
	isTeamDescription,
	isTeamOnList,
	isTeamMemberNumber,
	areMembersOnTheList: areTeamMembersOnTheList,
	getTeamMemberIcon,
};
