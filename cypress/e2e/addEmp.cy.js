describe('Add Employee Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/add-employee'); 
  });

  it('Add a new employee', () => {
    cy.get('[placeholder="Enter Employee Name"]').type('Rahul Jaiswal');
    cy.get('select').select('Employee');
    cy.get('form').submit();
    cy.get('.feedback').should('contain', 'Employee added successfully!');
  });

  it('Add a new employee', () => {
    cy.get('[placeholder="Enter Employee Name"]').type('RaJ');
    cy.get('select').select('Employee');
    cy.get('form').submit();
    cy.get('.feedback').should('contain', 'Employee added successfully!');
  });

  it('Delete an employee', () => {
    cy.get('button').contains('Delete').click()
    // cy.get('input[type="text"]').type('delete')
    // cy.get('button').contains('OK').click()
    cy.get('.delete-modal [placeholder="Type \'delete\' to confirm"]').type('delete');
    cy.get('button').contains('OK').click();

  });
 

});
