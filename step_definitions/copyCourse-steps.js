'use strict';
let teacherLogin = require('../page-objects/teacherLogin');
let createCourse = require('../page-objects/createCourse');

let copyCourse = require('../page-objects/copyCourse');
let courseData = require('../shared-objects/courseData');
const Login = require('../shared-objects/loginData');
const firstLogin = require('../shared_steps/firstLogin.js');

const { After, Before, AfterAll, BeforeAll } = require('cucumber');
let before;

//________Background_________

Given(/^teacher goes to the home page$/, function() {
  return helpers.loadPage(courseData.url2, 20);
});
Given(/^teacher is successfully logged in/, function() {
  return teacherLogin.performLogin(
    Login.deafultTeacherUsername,
    Login.defaultTeacherpassword
  );
});
Given(/^teacher has accepted the data protection agreement$/, function() {
  return firstLogin.firstLoginTeacher();
});
Given(/^goes the course page$/, function() {
  return helpers.loadPage(courseData.url, 20);
});
Given(
  /^the course, which must be cloned, will be created with some name$/,
  async function() {
    var name = 'Test course';
    return copyCourse.create(name);
  }
);
Given(/^the amount of courses is x$/, async function() {
  before = await createCourse.count();
  return before;
});

// _________Copy__________

When(/^the teacher selects the course and clicks clones it$/, function() {
  return copyCourse.copyCourse();
});
Then(/^the amount of courses should be x plus one$/, async function() {
  await copyCourse.verifySimpleCopyCourse();
});

// _________With Text__________
When(/^the teacher adds some Text to the course$/, function() {
  return copyCourse.addText();
});
When(/^the teacher adds a topic$/, function() {
  return copyCourse.themaAndSubthema();
});
When(/^the teacher clicks copy course with Text$/, function() {
  return copyCourse.copyCourse();
});

When(
  /^teacher sees the course copy and the Text is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);
// _________With GeoGebraArbeitsblatt__________
When(/^the teacher adds some GeoGebraArbeitsblatt to the course$/, function() {
  return copyCourse.addGeoGebraArbeitsblatt();
});
When(/^the teacher clicks copy course with GeoGebraArbeitsblatt$/, function() {
  return copyCourse.copyCourse();
});
When(
  /^teacher sees the course copy and the GeoGebraArbeitsblatt is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);

// _________With Material__________
When(/^the teacher adds some Material to the course$/, function() {
  return 'pending';
});
When(/^the teacher clicks copy course with Material$/, function() {
  return 'pending';
});
When(
  /^teacher sees the course copy and the Material is still availiable$/,
  function() {
    return 'pending';
  }
);

// _________With NeXboard__________
When(/^the teacher adds some NeXboard to the course$/, function() {
  return copyCourse.addNeXboard();
});
When(/^the teacher clicks copy course with NeXboard$/, function() {
  return copyCourse.copyCourse();
});
When(
  /^teacher sees the course copy and the NeXboard is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);

// _________With Etherpad__________
When(/^the teacher adds some Etherpad to the course$/, function() {
  return copyCourse.addEtherpad();
});
When(/^the teacher edits the content of the etherpad$/, function() {
  return copyCourse.editEtherpad();
});
When(/^the teacher clicks copy course with Etherpad$/, function() {
  return copyCourse.copyCourse();
});
When(
  /^teacher sees the course copy and the Etherpad is still availiable$/,
  function() {
    return copyCourse.verify();
  }
);
// _________With InternComponents__________
When(/^the teacher adds some InternComponents to the course$/, function() {
  return 'pending';
});
When(/^the teacher clicks copy course with InternComponents$/, function() {
  return 'pending';
});
When(
  /^teacher sees the course copy and the InternComponents is (are) still availiable$/,
  function() {
    return 'pending';
  }
);

// _________With pupils__________
When(/^the teacher copies the course with pupils$/, function() {
  return copyCourse.copyCourse();
});
Then(
  /^the teacher should see the cloned course but without pupils$/,
  function() {
    return copyCourse.verifyPupils();
  }
);
