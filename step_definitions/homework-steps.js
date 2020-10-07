'use strict';
const path = require('path');
const addEditHomeworkPage = require('../page-objects/pages/HMWRKAddEditHomeworkPage.js');
const taskListPage = require('../page-objects/pages/HMWRKHomeworkListPage');
const taskPage = require('../page-objects/pages/HMWRKHomeworkPage');
const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const courseHomeworksPage = require("../page-objects/pages/coursePages/CRSSCourseHomeworksPage");
const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const navigationTopPage = require('../page-objects/pages/NavigationTopPage');
/* Given */
Given(/^.* teacher creates one course with name {string}$/, function (coursename) {
    return addCoursePage.createCourse(coursename);
});
/*  @createTaskForStudents */

When(/^.* creates one course with name (.*)$/, function (coursename) {
    return addCoursePage.createCourse(coursename);
});
Then('click left navigation item {string}', function (string) {

When(/^.* clicks "create a new home task" in the course (.*) with (.*)$/, function (coursename, taskname) {
    return addEditHomeworkPage.addBasicHometask(coursename, taskname);
});

Then(/^the hometask with (.*) is to be found at the task pannel$/, function (taskname) {
    return taskListPage.goToHomeworkListAndCheckTaskIfExist(taskname);
});

/* PRIVATE */

Given(/^the teacher creates one course with (.*) and student with (.*)$/, function (coursename, studentname) {
    return addCoursePage.createCourseWithStudents(coursename, studentname);
});

When(/^teacher creates a private hometask in the course (.*) with (.*)$/, async function (coursename, taskname) {
    await addEditHomeworkPage.addPrivateHometask(coursename, taskname);
    await taskListPage.goToPrivateHomeworkArea();
    const msg = 'Task with name: "' + taskname + '" should be visible on the list.' + '\n' + 'Actual list of tasks: ';
    expect(await taskListPage.isTaskVisible(taskname), msg + await taskListPage.getAllTasks() + "'").to.equal(true);
    await navigationTopPage.performLogout();
});

Then(/^the student will not see this task with (.*)$/, async function (taskname) {
    await taskListPage.goToPrivateHomeworkArea();
    const msg = 'Task with name: "' + taskname + '" should not be visible on the list.' + '\n' + 'Actual list of tasks: ';
    expect(await taskListPage.isTaskVisible(taskname), msg + await taskListPage.getAllTasks() + "'").to.equal(false);
});

/* SUBMISSION */
When(/^the student finds (.*)$/, function (taskname) {
    return taskListPage.clickOnTaskFromList(taskname);
});

When(/^student with (.*), (.*) of this course (.*) goes to hometasks$/, function (username, password, coursename) {
    return courseListPage.studentLogsInAndGoesToTasksOfTheCourse(username, password, coursename, courseListPage.section.activeCourses);
});

When(/^the student edits a text hometask and submits it$/, function () {
    return taskPage.studentEditsTextHomeworkAndSubmits();
});
Then(/^the teacher can see the submission in course (.*) of task (.*) done by student (.*) and$/, function (coursename, taskname, studentname) {
    return taskPage.teacherLogsInAndCanSeeTheTextSubmission(coursename, taskname, studentname);
});

/* File task submission*/
Given(/^the Teacher creates one course with (.*) and pupil with:$/, function (coursename) {
    return copyCourse.create(coursename);
});
When(/^Teacher creates a task for the course (.*)$/, function (coursename) {
	return courseHomeworksPage.clickAddNewTaskInCourse(coursename);
});
When(/^the teacher puts in data (.*) and some text description of the task$/, function (taskname) {
    return addEditHomeworkPage.addBasicHometask(taskname);
});
When(/^the user goes to the course (.*) where the task (.*) must be submitted$/, function (coursename, taskname) {
    return addEditHomeworkPage.uploadHomework();
});
Then(/^the students can upload a file as a solution$/, function () {
    return addEditHomeworkPage.uploadHomework();
});

(function () {
    const courseName = 'file feedback';
    const taskName = 'Art task';
    const file = {
        path: path.join(__dirname, '../shared-objects/fileUpldFolder/upload.txt'),
        name: 'upload.txt'
    };
    const student = {
        login: 'paula.meyer@schul-cloud.org',
        password: 'Schulcloud1!'
    };
})

    Given(/^the teacher has posed a task$/, function () {
        return addEditHomeworkPage.addBasicHometask(courseName, taskName);
    });

    Given(/^the student has submitted that task$/, function () {
        return taskPage.submitHomework(taskName, student);
    });

    When(/^the teacher uploads file feedback$/, function () {
        return taskPage.submitFileFeedback(taskName, file);
    });

    Then(/^both the teacher and student can see and download the feedback$/, function () {
        return taskPage.testFileUploadSuccess(taskName, file, student);
    });
});
