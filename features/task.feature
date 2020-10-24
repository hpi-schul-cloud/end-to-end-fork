#with creating a course
@task

Feature: create different types of task


    Background: a teacher logs in and creates a course
        Given teacher arrives on the Schul-Cloud homepage
        And teacher logs in
        And teacher accepts data protection
        And teacher goes to courses page
    
    @createTaskInTheCourse
    Scenario Outline: create a simple hometask
        When teacher creates course with name '<coursename>'
        And teacher clicks create-a-new-task-button in the course <coursename>
        And teacher puts taskname <taskname> into name field
        And teacher clicks on "enable group submission" checkbox
        And teacher sets accomplish time for the task
        And teacher puts taskBody <taskText> into body field
        And teacher clicks submit-task-button
        When teacher goes to tasks page
        Then the hometask with <taskname> is to be found at the task pannel
        Examples:
            | coursename             | taskname     | taskText                          | 
            | new course with a task | task example | here is some task for my students |

    @createPrivateTaskInTheCourse
    Scenario Outline: create a private hometask has to be visible only for the teacher
        When teacher creates a course <coursename> and adds student <studentname> to this course
        And teacher clicks create-a-new-task-button in the course <coursename>
        And teacher puts taskname <taskname> into name field
        And teacher sets accomplish time for the task
        And teacher puts taskBody <taskText> into body field
        And teacher clicks on "private task" checkbox
        And teacher clicks submit-task-button on task-creation-form
        When teacher goes to tasks page
        Then the task <taskname> should be visible for the teacher
        And teacher logs out 
        When student arrives on the Schul-Cloud homepage
        And student logs in with email <username> and password <password>
        And student with full age accepts student's data protection with password <newStudentPassword>
        And the student goes to the tasks section
        Then the task <taskname> should not be visible for student
        Examples:
        | coursename            | studentname | taskname             | username                    | password     | newStudentPassword     |
        | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!          |

    #@submitTextHomework
    #Scenario Outline: pupil submits a task and teacher evaluates it
    #Given the teacher creates one course with <coursename> and student with <studentname>
    #Given teacher clicks "create a new home task" in the course <coursename> with <taskname>
    #When student with <username>, <password> of this course <coursename> goes to hometasks
    #When the student finds <taskname>
    #Then the student sees the task <taskname> on the dashboard and
    #When the student edits a text hometask and submits it
    #Then the teacher can see the submission in course <coursename> of task <taskname> done by student <studentname> and
    #Then teacher can evaluate the task <taskname>
    #Examples:
    #| coursename                        | firstname   | lastname | taskname   | username                     | password     | studentname  |
    #| course with a task for submission | Paula       | Meyer    | task       | paula.meyer@schul-cloud.org  | Schulcloud1! | Paula Meyer  |

    @gradeHomeworkWithFile
    Scenario Outline: grade a task submission by uploading a file
        When teacher creates a course <coursename> and adds student <studentname> to this course
        And teacher clicks create-a-new-task-button in the course <coursename>
        And teacher puts taskname <taskname> into name field
        And teacher clicks submit-task-button
        And teacher logs out
        When student arrives on the Schul-Cloud homepage
        And student logs in with email <username> and password <password>
        And student with full age accepts student's data protection with password <newPasswordStudent>
        And student goes to tasks page
        And student clicks on task with name <taskname>
        And student submits solution for the task
        #And the student has submitted that task
        And student logs out 
        When teacher logs in
        And teacher goes to tasks page
        And teacher clicks on task with name <taskname>
        And the teacher uploads file feedback
        And teacher goes to evaluation tab
        Then teacher can see the file evaluation
        And teacher logs out
        And student arrives on the Schul-Cloud homepage
        And student goes to tasks page
        And student clicks on task with name <taskname>
        And student goes to task evaluation
        Then file evaluation is visible for student 

       # Then both the teacher and student can see and download the feedback
        Examples:
            | username                    | password     | newPasswordStudent | taskname              | studentname | coursename            |
            | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task with file upload | Paula Meyer | course with file task |
