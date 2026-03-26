class RegistrationModal {
  getModalTitle() {
    return cy.contains('h4.modal-title', 'Registration');
  }

  getCloseButton() {
    return cy.get('button.close');
  }

  getNameInput() {
    return cy.get('#signupName');
  }

  getLastNameInput() {
    return cy.get('#signupLastName');
  }

  getEmailInput() {
    return cy.get('#signupEmail');
  }

  getPasswordInput() {
    return cy.get('#signupPassword');
  }

  getRepeatPasswordInput() {
    return cy.get('#signupRepeatPassword');
  }

  getRegisterButton() {
    return cy.contains('button.btn.btn-primary', 'Register');
  }

  typeName(value) {
    this.getNameInput().clear().type(value);
  }

  typeLastName(value) {
    this.getLastNameInput().clear().type(value);
  }

  typeEmail(value) {
    this.getEmailInput().clear().type(value);
  }

  typePassword(value) {
    this.getPasswordInput().clear().type(value, { sensitive: true });
  }

  typeRepeatPassword(value) {
    this.getRepeatPasswordInput().clear().type(value, { sensitive: true });
  }

  blurName() {
    this.getNameInput().click().blur();
  }

  blurLastName() {
    this.getLastNameInput().click().blur();
  }

  blurEmail() {
    this.getEmailInput().click().blur();
  }

  blurPassword() {
    this.getPasswordInput().click().blur();
  }

  blurRepeatPassword() {
    this.getRepeatPasswordInput().click().blur();
  }

  fillForm({ name, lastName, email, password, repeatPassword = password }) {
    this.typeName(name);
    this.typeLastName(lastName);
    this.typeEmail(email);
    this.typePassword(password);
    this.typeRepeatPassword(repeatPassword);
  }

  clickRegisterButton() {
    this.getRegisterButton().click();
  }

  shouldBeOpened() {
    this.getModalTitle().should('be.visible');
  }

  nameShouldBeInvalid() {
    this.getNameInput().should('have.class', 'is-invalid');
  }

  lastNameShouldBeInvalid() {
    this.getLastNameInput().should('have.class', 'is-invalid');
  }

  emailShouldBeInvalid() {
    this.getEmailInput().should('have.class', 'is-invalid');
  }

  passwordShouldBeInvalid() {
    this.getPasswordInput().should('have.class', 'is-invalid');
  }

  repeatPasswordShouldBeInvalid() {
    this.getRepeatPasswordInput().should('have.class', 'is-invalid');
  }

  registerButtonShouldBeDisabled() {
    this.getRegisterButton().should('be.disabled');
  }

  registerButtonShouldBeEnabled() {
    this.getRegisterButton().should('not.be.disabled');
  }
}

export default RegistrationModal;