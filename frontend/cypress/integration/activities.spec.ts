describe('TriTrainingLog e2e testing', () => {
	beforeEach(() => {
		cy.task('reset:db');
		cy.intercept('POST', 'http://localhost:3000/activities').as('submitActivity');
		cy.intercept('GET', 'http://localhost:3000/activities').as('getActivities');
		cy.intercept('PATCH', 'http://localhost:3000/activities/*').as('patchActivity');
		cy.intercept('DELETE', 'http://localhost:3000/activities/*').as('deleteActivity');
	});

	it('log an activity, edit it, delete it', () => {
		// visit the page
		cy.visit('http://localhost:5000/');
		cy.wait('@getActivities');

		// fill the new activity form
		cy.dataCy('log-activity-button').click();
		cy.get('#Name').click();
		cy.get('#Name').type('Morning ride with friends! =)');
		cy.get('select#Sport').select('bike');
		cy.get('#Distance').click();
		cy.get('#Distance').type('120000');
		cy.get('#Note').click();
		cy.get('#Note').type('Long ride with lots of hillss');

		// submit the activity
		cy.get('button[type="submit"]').click();
		cy.wait('@submitActivity');
		cy.wait('@getActivities');
		cy.contains('Morning ride with friends! =)');

		// activity should be first in the list
		cy.get('[data-cy=activity-name').first().contains('Morning ride with friends! =)');

		// edit the activity to fix the typo in the note
		cy.dataCy('activity-card')
			.first()
			.within(() => {
				cy.dataCy('actions').get('button').eq(0).click();
			});
		cy.get('#Note').click();
		cy.get('#Note').type('{backspace}');

		// submit the activity
		cy.get('button[type="submit"]').click();
		cy.wait('@patchActivity');
		cy.wait('@getActivities');
		cy.contains('Long ride with lots of hills');

		// click the delete button
		cy.dataCy('activity-card')
			.first()
			.within(() => {
				cy.dataCy('actions').get('button').eq(1).click();
			});
		cy.wait('@deleteActivity');
		cy.wait('@getActivities');
		cy.contains('Morning ride with friends! =)').should('not.exist');
		cy.dataCy('activity-name').first().contains('Morning Swim');
	});
});
