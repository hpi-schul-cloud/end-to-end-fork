'use strict';

const loginData = require('../shared-objects/loginData'),
  imageCompare = require('../runtime/imageCompare'),
  shared = ({loginData});

let log = global.log;
let image;

module.exports = {

    loginResult: async function() {
        expect(
          //let initialsSel = await driver.$('.avatar-circle');
          await helpers.getElementText('.avatar-circle')).to.equal('TT');
    },
    compareScreenshots: async function(filename) {
      await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');
      
      await helpers.compareImage(`${filename}.png`);
    
    }
    

  };