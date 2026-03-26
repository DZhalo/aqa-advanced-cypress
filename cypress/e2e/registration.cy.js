import HomePage from '../pages/HomePage';
import RegistrationModal from '../pages/RegistrationModal';
import GaragePage from '../pages/GaragePage';

describe('Registration form', () => {
  const homePage = new HomePage();
  const registrationModal = new RegistrationModal();
  const garagePage = new GaragePage();

  let user;

  beforeEach(() => {
    cy.fixture('userData').then((data) => {
      user = {
        ...data,
        email: `daria+${Date.now()}@test.com`,
      };
    });

    homePage.visit();
    homePage.clickSignUpButton();
    registrationModal.shouldBeOpened();
  });

  it('should show required field errors for empty registration form', () => {
    registrationModal.blurName();
    cy.contains('.invalid-feedback p', 'Name required').should('be.visible');
    registrationModal.nameShouldBeInvalid();

    registrationModal.blurLastName();
    cy.contains('.invalid-feedback p', 'Last name required').should('be.visible');
    registrationModal.lastNameShouldBeInvalid();

    registrationModal.blurEmail();
    cy.contains('.invalid-feedback p', 'Email required').should('be.visible');
    registrationModal.emailShouldBeInvalid();

    registrationModal.blurPassword();
    cy.contains('.invalid-feedback p', 'Password required').should('be.visible');
    registrationModal.passwordShouldBeInvalid();

    registrationModal.blurRepeatPassword();
    cy.contains('.invalid-feedback p', 'Re-enter password required').should('be.visible');
    registrationModal.repeatPasswordShouldBeInvalid();

    registrationModal.registerButtonShouldBeDisabled();
  });

it('should show validation errors for invalid values', () => {
  registrationModal.typeName('Ц');
  registrationModal.blurName();
  cy.contains('.invalid-feedback p', 'Name is invalid').should('be.visible');
  cy.contains('.invalid-feedback p', 'Name has to be from 2 to 20 characters long').should('be.visible');
  registrationModal.nameShouldBeInvalid();

  registrationModal.typeLastName('Ц');
  registrationModal.blurLastName();
  cy.contains('.invalid-feedback p', 'Last name is invalid').should('be.visible');
  cy.contains('.invalid-feedback p', 'Last name has to be from 2 to 20 characters long').should('be.visible');
  registrationModal.lastNameShouldBeInvalid();

  registrationModal.typeEmail('Ц');
  registrationModal.blurEmail();
  cy.contains('.invalid-feedback p', 'Email is incorrect').should('be.visible');
  registrationModal.emailShouldBeInvalid();

  registrationModal.typePassword('1');
  registrationModal.blurPassword();
  cy.contains('.invalid-feedback p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    .should('be.visible');
  registrationModal.passwordShouldBeInvalid();

  registrationModal.typeRepeatPassword('1');
  registrationModal.blurRepeatPassword();
  registrationModal.registerButtonShouldBeDisabled();
});

it('should show error when passwords do not match', () => {
  registrationModal.fillForm({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    repeatPassword: 'Another1',
  });

  registrationModal.blurRepeatPassword();

  cy.contains('.invalid-feedback p', 'Passwords do not match').should('be.visible');
  registrationModal.repeatPasswordShouldBeInvalid();
  registrationModal.registerButtonShouldBeDisabled();
});

  it('should keep Register button disabled when form is invalid', () => {
    registrationModal.typeName('A');
    registrationModal.typeLastName('B');
    registrationModal.typeEmail('wrongemail');
    registrationModal.typePassword('123');
    registrationModal.typeRepeatPassword('123');

    registrationModal.registerButtonShouldBeDisabled();
  });

  it('should enable Register button when form is valid', () => {
    registrationModal.fillForm(user);
    registrationModal.registerButtonShouldBeEnabled();
  });

  it('should register a new user with valid data', () => {
    registrationModal.fillForm(user);
    registrationModal.registerButtonShouldBeEnabled();
    registrationModal.clickRegisterButton();

    garagePage.verifyPageIsOpened();
  });

  it('should login with created credentials (via custom command)', () => {
    registrationModal.fillForm(user);
    registrationModal.clickRegisterButton();

    garagePage.verifyPageIsOpened();

    cy.clearCookies();
    cy.clearLocalStorage();

    homePage.visit();
    cy.login(user.email, user.password);

    garagePage.verifyPageIsOpened();
  });
});