/*[url/homework/[homeworkId]]*/
'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../runtime/helpers/elementHelpers');
const courseListPage = require('./coursePages/CRSSCourseListPage');
const navigationTopPage = require('./NavigationTopPage');
const startPage = require('./generalPagesBeforeLogin/StartPageBeforeLogin');
const loginPage = require('./generalPagesBeforeLogin/LoginPage');
const TaskListPage = require('./TASKListPage');
const CRSSGeneralCoursePage = require('./coursePages/CRSSGeneralCoursePage');
const textFieldSel = '.ck-content';
const submitBtn = '.ckeditor-submit';
const activeSubmissions = '.tab-content.section-homeworksubmissions.active';
const gradeFilesListSel = '.list-group-files';
const teacherSubmissionsTab = '#submissions-tab-link';
const studentSubmissionTab = '#submission-tab-link';
const submissionContainer = '.table .usersubmission';
const remoteFilePathInput = 'input[type=file][class=dz-hidden-input]';
const commentBtn = 'a#comment-tab-link.tab-link';
const selectorTabFeedbackForSubmission = '#feedback-tab-link';
const hometasksTabSel = 'button[data-testid="hometasks"]';
let fileUrl; 

async function submitSolutionForTheHometask() {
	const assignmentText = 'here is some text which I want to submit';
	await waitHelpers.waitAndSetValue(textFieldSel, assignmentText);
	await elementHelpers.clickAndWait(submitBtn);
}

async function studentEditsTextHomeworkAndSubmits() {
	await openStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function openTeacherSubmissionsTab() {
	await elementHelpers.click(teacherSubmissionsTab);
}

async function openStudentSubmissionTab() {
	await elementHelpers.click(studentSubmissionTab);
}

// teacher helpers
async function hasTheStudentSubmittedTheTask(studentname) {
	await openTeacherSubmissionsTab();
	const listOfSubmisionStudentNames = await getListOfSubmisions();
	const isSubbmitedByStudent = listOfSubmisionStudentNames.some(
		async (element) =>
            (await element.getText()).includes(studentname) && 
            (await element.$$('i.fa-check')).length == 1
	);
	await expect(isSubbmitedByStudent).to.equal(true);
}

async function getListOfSubmisionStudentNames() {
	return elementHelpers.getTextFromAllElements(submissionContainer);
}

async function getListOfSubmisions() {
	return elementHelpers.getListOfAllElements(submissionContainer);
}

async function teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname) {
	await startPage.clickLoginBtn();
	await loginPage.performLogin(
		loginPage.users.teachers.klaraFallUsername,
		loginPage.users.teachers.klaraFallPassword
	);
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await CRSSGeneralCoursePage.openHomeworksTab();
	await TaskListPage.clickOnTask(taskname, 'Task open');
	await hasTheStudentSubmittedTheTask(studentname);
}
//delete
async function submitHomework() {
	await openStudentSubmissionTab();
	await submitSolutionForTheHometask();
}

async function goToEvaluationTab() {
	await openTeacherSubmissionsTab();
	await clickOnFirstSubmission();
	await clickCommentBtn();
}

async function clickOnFirstSubmission() {
	await elementHelpers.click(submissionContainer);
}

async function clickCommentBtn() {
	await elementHelpers.click(commentBtn);
}
async function gotoTasksTab () {
	await elementHelpers.clickAndWait(hometasksTabSel)
	
}
async function clickOpenFeedbackTab () {
	await elementHelpers.click(selectorTabFeedbackForSubmission)
}

async function submitFileFeedback(taskName, file) {
	await goToEvaluationTab();
	await driver.execute(function () {
		document.querySelector('input[type=file][class=dz-hidden-input]').style = {};
	});
	const remoteFilePath = await driver.uploadFile(file.path);
	await waitHelpers.waitAndSetValue(remoteFilePathInput, remoteFilePath);
	await waitHelpers.waitUntilElementIsVisible(activeSubmissions);
}
//delete
async function testFileUploadSuccess(taskName, file, student) {
	await goToEvaluationTab();
	if (process.env.CI) {
		console.warn('S3 is not available on CI. The files were never uploaded.');
		return;
	}
	await isFileVisible(file);
	const mainWindow = await driver.getWindowHandle();
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	const fileUrl = await getCurrentTabUrl();
	await driver.switchToWindow(mainWindow);
	await navigationTopPage.performLogout();
	await loginPage.performLogin(student.login, student.password);
	await TaskListPage.goToHomeworkListPage();
	await elementHelpers.click(`*=${taskName}`);
	await clickCommentBtn();
	await isFileVisible(file);
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	const studentFileUrl = await getCurrentTabUrl();
	expect(studentFileUrl.origin).to.equal(fileUrl.origin);
	expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}
async function checkFileEvaluationStudent (file) {
	await isFileVisible(file);
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	const studentFileUrl = await getCurrentTabUrl();
	expect(studentFileUrl.origin).to.equal(fileUrl.origin);
	expect(studentFileUrl.pathname).to.equal(fileUrl.pathname);
}

async function checkFileEvaluationTeacher (file) {
	if (process.env.CI) {
		console.warn('S3 is not available on CI. The files were never uploaded.');
		return;
	}
	await isFileVisible(file);
	const mainWindow = await driver.getWindowHandle();
	await elementHelpers.clickAndWait(`a*=${file.name}`);
	fileUrl = await getCurrentTabUrl();
	await driver.switchToWindow(mainWindow);

}

async function isFileVisible(file) {
	const gradeFilesList = await waitHelpers.waitUntilElementIsVisible(gradeFilesListSel);
	expect(await gradeFilesList.getText()).to.contain(file.name);
}

async function getCurrentTabUrl() {
	const handles = await driver.getWindowHandles();
	await driver.switchToWindow(handles[handles.length - 1]);
	return new URL(await driver.getUrl());
}

module.exports = {
	openSubmissionsTab: openTeacherSubmissionsTab,
	submitSolutionForTheHometask,
	studentEditsTextHomeworkAndSubmits,
	hasTheStudentSubmittedTheTask,
	teacherLogsInAndCanSeeTheTextSubmission,
	submitHomework,
	teacherShowGradeTabForFirstSubmission: goToEvaluationTab,
	submitFileFeedback,
	testFileUploadSuccess,
	isFileVisible,
	getCurrentTabUrl,
	gotoTasksTab,
	goToEvaluationTab,
	clickCommentBtn,
	checkFileEvaluationStudent,
	checkFileEvaluationTeacher,
	clickOpenFeedbackTab
};
