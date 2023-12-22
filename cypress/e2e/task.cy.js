describe('Add Task Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/add-task'); 
  });

  it('should add a new task', () => {
    cy.get('[placeholder="Enter Task"]').type('Abc');
    cy.get('form').submit();
    cy.get('.feedback').should('contain', 'Task added successfully!');
  });

});
