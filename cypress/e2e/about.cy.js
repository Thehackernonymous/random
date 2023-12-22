describe('About Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/about-us'); 
  });

  it('about page', () => {
    cy.get('generate').data();
  });
});