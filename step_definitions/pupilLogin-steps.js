'use strict';

let pupilLogin = require('../page-objects/pupilLogin');
let loginData = require('../shared-objects/loginData');
let performLogin = require('../page-objects/performLogin');
let shared = ({loginData, performLogin});
let page = ({pupilLogin});
const firstLogin = require('../shared_steps/firstLogin.js');

Given(/^a pupil arrives on the Schul-Cloud login homepage$/, function () {
    return helpers.loadPage(shared.loginData.url, 10);
});

When(/^a pupil puts in (.*) and (.*) and clicks the login-button$/, function (username, password) {
    return shared.performLogin.performLogin(username,password);
});  

Then(/^pupil accepts data security$/, function() {
    return firstLogin.firstLoginPupilFullAge();
  });

Then(/^a pupil should see the dashboard$/, function () {    
    return page.pupilLogin.loginResult();
});
