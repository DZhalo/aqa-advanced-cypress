class HomePage {
  visit() {
    cy.visitWithBasicAuth('/');
  }

  clickSignInButton() {
    cy.get('button').contains('Sign In').click();
  }

  clickSignUpButton() {
    cy.get('button').contains('Sign up').click();
  }
}

export default HomePage;