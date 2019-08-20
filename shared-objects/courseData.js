const { CLIENT } = require("./servers");

module.exports = {
  url: `${CLIENT.URL}/courses`,
  url2: `${CLIENT.URL}/login`,
  elem: {
    addBtn: 'section#section-courses a[data-testid=\'courseAddButton\']',
    courseContainer:
      'section#section-courses div[class=\'sc-card-wrapper col-xl-3 col-lg-4 col-md-6 col-sm-12\']',
    nameCourse: 'input.js-course-name-input',
    colorCourse: 'label[style=\'background: #FFEE58\']',
    teacherCourse: 'select[data-testid=\'teachersearch\']',
    findTeacher: 'option[data-testid=\'teacher\']',
    representativeCourse:
      'select[data-testid\'substituent\']',
    appointmentCourse:
      'input[data-testid=\'startingDate\']',
    cloneBtn: 'input[data-testid=\'startingDate\']',

    weiterBtn: 'button[data-next-label=\'Weiter\']',
    classesOfTheCourse: 'section#section-2 input[data-testid=\'classes\']',
    pupilsOfTheCourse: 'select[data-testid=\'pupils\']',
    kursAnlegenUndWeiterBtn:
      'button[data-submit-label=\'Kurs anlegen und Weiter\']',
    zurUebersichtBtn: 'a[id=\'preshow\']',
    teilnehmerFenster: 'section#section-courses '
  }
};
