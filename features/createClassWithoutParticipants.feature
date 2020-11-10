@administration @class
Feature: As administrator of a school I want to create a new class but without a
	teacher and without students so that I can add teachers and students later on

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createClassWithoutMembers
	Scenario Outline: As a user, I want to be able to create class without a members
		When <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to administration
		And <userRole> goes to class administration
		When <userRole> creates class with custom name '<customClassName>'
		Then <userRole> should see that class with name '<customClassName>' and '0' members is visible
		Examples:
			| userRole | adminUsername         | adminPassword | customClassName |
			| admin    | admin@schul-cloud.org | Schulcloud1!  | 11c             |
