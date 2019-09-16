'use strict';

const teamData = require('../shared-objects/teamsData');
const { expect } = require('chai');
let name;
let indexes = [];
var searchBox;
var numberOFmatches;
let pupilNames;

module.exports = {
    createATeamSTEPS: async function() {
        let url = teamData.addTeamURL;
        await helpers.loadPage(url, 20);
        name= "a team";
        let nameField = await driver.$(teamData.teamName);
        await nameField.setValue(name);
        let createBtn = await driver.$(teamData.createTeamBtn);
        await createBtn.click();
    },
    addMembersToTheTeamSTEPS: async function() {
        await driver.execute('document.querySelector("#team_settings").click()');
        await driver.$('#team_settings').then(button=>button.click());
        await driver.execute('document.querySelector("#administrate_team_members").click()');
        await driver.execute('document.querySelector("#internal_team_members").click()');
        await driver.pause(2000);
        let container = await driver.$('#userIds___chosen > ul');
        searchBox = await container.$('li > input');
        await searchBox.click();
        let arrayNumberOFmatches = await driver.$$(".chosen-results li");
        numberOFmatches = arrayNumberOFmatches.length;
        let pupils = await driver.$$('#userIds___chosen > div > ul > li');
        let promiseNames = pupils.map(async element => await element.getText());
        pupilNames = await Promise.all(promiseNames);
    },
    
    getTeamNames: async function() {
        let teamsPage = teamData.url;
        await helpers.loadPage(teamsPage, 20);
        let elements = await driver.$$('#main-content > section > section > div > div div');
        const namePromises = elements.map(async element => await element.getText());
        const teamNames = await Promise.all(namePromises);
        return teamNames;

    },
    addTeamMemberSTEPS: async function(fullname) {
        await searchBox.click();
        for (var i=0; i<=numberOFmatches; i++) {
            if (pupilNames[i]==fullname) {
                await indexes.push(i+1);
            }
        }
    },
        addTeamMemberOne: async function() {
            let chooseTeammember1 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[0]+')');
            await chooseTeammember1.click();
        },
        addTeamMemberTwo: async function() {
            let chooseTeammember1 = await driver.$('#userIds___chosen > div > ul > li:nth-child('+indexes[1]+')');
            await chooseTeammember1.click();
        },
       
    createTeamWithTwoMembers: async function(nameOne, nameTwo) {
        await this.createATeamSTEPS();
        await this.addMembersToTheTeamSTEPS();
        await this.addTeamMemberSTEPS(nameOne);
        await this.addTeamMemberOne();
        await searchBox.click();
        await this.addTeamMemberSTEPS(nameTwo);
        await this.addTeamMemberTwo();
    },
    verify: async function() {
        let url = teamData.url;
        await helpers.loadPage(url, 20);
        let names = await this.getTeamNames();
        await expect(names).to.include(name);
    }
}
