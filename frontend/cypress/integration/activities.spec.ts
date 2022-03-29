describe('TriTrainingLog e2e testing', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5000/');
	});

	it('should display three activities initially', () => {
		cy.get('[data-cy="activity-card"]').should('have.length', 3);
	});

	it('should log a now activity', () => {
		cy.get('[data-cy="log-activity-button"]').click();
		cy.get('input#Name').type('My new cycling activity');
		cy.get('select#Sport').select('bike');
		cy.get('input#Distance').type('{backspace}1000');
		cy.get('input#Note').type('This is a cool new note 👌');
		cy.get('button[type="submit"]').click();

		cy.get('[data-cy="activity-card"]').should('have.length', 4);
	});
});
