@lernstore
Feature: different actions in lernstore
Background: a teacher logs in and creates a course
Given teacher arrives on the Schul-Cloud homepage
Given teacher is successfully logged in
Given teacher goes to courses page



@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
Given teacher creates some course with name <coursename>
Given teacher chooses the created course with <coursename> and
When teacher adds a Topic with name <topicName>
When teacher adds some Lerstore material with <lerstoreTopicName> to the course
Then teacher must be redirected to content page
When teacher searches for content <content>
Then teacher must see the right number of materials <content> 
When teacher clicks on content-card after request <content>
When teacher clicks add-btn
When teacher selects course <coursename> and topic <topicName>
When teacher clicks on add content button
When teacher goes to topic <topicName> of course <coursename>
Then teacher should see added material <content>
Examples:
    | coursename          | topicName             | lerstoreTopicName | content |
    | courseWithLernstore | Topic with Lernstore  | LernstoreTest     | Mathe   |

