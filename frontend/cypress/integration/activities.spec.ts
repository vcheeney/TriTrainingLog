describe('TriTrainingLog e2e testing', () => {
	beforeEach(() => {
		cy.task('reset:db');
		cy.visit('http://localhost:5000/');
	});

	it('log an activity, edit it, delete it', () => {
		// visit the page
		cy.visit('http://localhost:5000/');

		// log an activity
		cy.get('[data-cy="log-activity-button"]').click();
		cy.get('#Name').click();
		cy.get('#Name').type('Morning ride with friends! =)');
		cy.get('select#Sport').select('bike');
		cy.get('#Distance').click();
		cy.get('#Distance').type('120000');
		cy.get('#Note').click();
		cy.get('#Note').type('Long ride with lots of hillss');
		cy.get('button[type="submit"]').click();

		// edit the activity
		cy.get(
			'[data-cy=activity-card]:nth-child(1) > [data-cy=actions] > button:nth-child(1)'
		).click();
		cy.get('#Note').click();
		cy.get('#Note').type('Long ride with lots of hills');
		cy.get('button[type="submit"]').click();

		// click the delete button
		cy.get(
			'[data-cy=activity-card]:nth-child(1) > [data-cy=actions] > button:nth-child(2)'
		).click();
	});
});
