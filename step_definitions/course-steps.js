'use strict';
const addCourse = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const CRSSEditCopyCoursePage = require('../page-objects/pages/coursePages/CRSSEditCopyCoursePage');
const CRSSGeneralCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');


When(/^.*goes to courses page$/, function () {
	return courseListPage.goToCourses();
});
Then(/^.*buttons: Import-course, Create-new-course are visible$/, function () {
	return courseListPage.areImportAndCreateCourseBtnsVisible();
});

Then(
	/^.*buttons: Create-new-course, Go-to-course-list-page are visible$/,
	async function () {
		await addCourse.areFinalButtonsVisible();
	}
);

When(/^.*clicks Create-new-course button$/, function () {
	return courseListPage.clickCreateCourseBtn();
});

When(/^.*enters course name (.*) into new course form$/, function (courseName) {
	return addCourse.setCourseName(courseName);
});
When(/^.*chooses course colour (.*)$/, function (courseColour) {
	return addCourse.setColour(courseColour);
});
When(/^.*clicks Create-button$/, function () {
	return addCourse.goToNextSection();
});
When(/^.*clicks to preview$/, function () {
	return addCourse.goToNextSection();
});

Then(/^.*course with name (.*) is visible on the list$/, async function (courseName) {
	const section = courseListPage.section.activeCourses;
	const msg = "Course with name: '" + courseName + "' should be visible on the list. Actual list of courses: '";
	let isCourseOnList = await courseListPage.isCourseOnListInSection(courseName, section);
	expect(isCourseOnList, msg + await courseListPage.getListOfCourseTitlesInSection(section) + "'").to.be.true;
});

Then(/^.*course with name (.*) is not visible on the list$/, async function (courseName) {
	const section = courseListPage.section.activeCourses;
	const msg = "Course with name: '" + courseName + "' should not be visible on the list. Actual list of courses: '";
	let isCourseOnList = await courseListPage.isCourseOnListInSection(courseName, section);
	expect(isCourseOnList, msg + await courseListPage.getListOfCourseTitlesInSection(section) + "'").to.be.false;
});

Then(
	/^.*course with name (.*) is displayed correctly on the list$/,
	async function (courseName) {
		await courseListPage.isCourseDisplayedCorrectly(courseName);
	}
);
When(/^.*clicks Next-section button$/, async function () {
	return addCourse.goToNextSection();
});
Then(/^.*the ([0-9]) section can not be opened$/, async function (
	sectionNumber
) {
	await addCourse.isSectionNotDisplayed(sectionNumber);
});
Then(
	/^.*his name is entered by default in teachers' field$/,
	async function () {
		await addCourse.isTeachersNameSetByDefault();
	}
);
Then(/^.*course name has not been entered$/, async function () {
	await addCourse.courseNameIsNotEntered();
});

Then(/^.*time span is already set$/, async function () {
	await addCourse.isTimeSpanSet();
});
Then(/^.*supply teacher is not set$/, async function () {
	await addCourse.isTeacherSubstituteSet();
});

Then(/^.* ([0-9]) section is opened$/, async function (sectionNumber) {
	await addCourse.isSectionDisplayed(sectionNumber);
});
Then(/^.*no class is set$/, async function () {
	await addCourse.isClassSet();
});
Then(/^.*no student is set$/, async function () {
	await addCourse.isStudentSet();
});
When(/^.*clicks Create-course-and-continue button'$/, async function () {
	await addCourse.clickCreateCourseAndContinueBtn();
});

Then(/^.*clicks Go-to-course-list$/, async function () {
	await addCourse.clickGoToCourseListBtn();
});

Then(/^.*color of the course is (\S*).*$/, async function (courseColour) {
	await courseListPage.isCorrectCourseColour(courseColour);
});

Then(/^.*chooses Kurs with name (\S*)$/, async function (courseName) {
	await courseListPage.clickOnCourseInSection(courseName, courseListPage.section.activeCourses);
});

Then(/^.*clicks on Course edit$/, async function () {
	await CRSSGeneralCoursePage.clickEditCourse();
});

Then(/^.*changes name of Course (\S*)$/, async function (changeName) {
	await CRSSEditCopyCoursePage.setCourseName(changeName);
});

When(/^.*enters Course description (.*)$/, async function (description) {
	await CRSSEditCopyCoursePage.setCourseDescription(description);
});

Then(/^.*clicks on save changes button$/, async function () {
	await CRSSEditCopyCoursePage.clickSubmitButton();
});

Then(/^.*course name (.*) with description correctly displayed (.*)$/, async function (courseName, description) {
	let index = await courseListPage.getIndexOfGivenCourseInSection(courseName, courseListPage.section.activeCourses)+1;
	let courseDescriptionAfterChanges = await courseListPage.getDescriptionCourse(index);
	expect(description).to.equal(courseDescriptionAfterChanges);
});

Then(/^.*course name (.*) with color correctly displayed (.*)$/, async function (courseName, colorCourse) {
	let index = await courseListPage.getIndexOfGivenCourseInSection(courseName, courseListPage.section.activeCourses)+1;
	let courseColorAfterChanges = await courseListPage.getColorCourse(index);
	let colourNumber = courseListPage.getColourSelector(colorCourse);
	expect(colourNumber.toLowerCase()).to.include(courseColorAfterChanges);
});

Then(/^.*clicks on delete course button$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButton();
});

Then(/^.*clicks on delete course button confirmation$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButtonConfirmation();
});


