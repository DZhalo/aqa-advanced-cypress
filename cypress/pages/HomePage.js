class HomePage {
  visit() {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  }

  clickSignUpButton() {
    cy.contains('button', 'Sign up').click();
  }

  clickSignInButton() {
    cy.contains('button', 'Sign In').click();
  }
}

export default HomePage;