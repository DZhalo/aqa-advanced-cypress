class GaragePage {
  verifyPageIsOpened() {
    cy.url().should('include', '/panel/garage');
    cy.contains('h1', 'Garage').should('be.visible');
    cy.contains('button', 'Add car').should('be.visible');
  }
}

export default GaragePage;