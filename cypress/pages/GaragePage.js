class GaragePage {
  visit() {
    cy.visitWithBasicAuth('/panel/garage');
  }

  getPageTitle() {
    return cy.get('h1');
  }

  getAddCarButton() {
    return cy.get('button.btn.btn-primary').contains('Add car');
  }

  clickAddCarButton() {
    this.getAddCarButton().click();
  }

  clickFuelExpensesHeaderLink() {
    cy.get('a.btn.header-link[href="/panel/expenses"]').click();
  }

  pageShouldBeOpened() {
    cy.url().should('include', '/panel/garage');
    this.getPageTitle().should('have.text', 'Garage');
    this.getAddCarButton().should('be.visible');
  }

  carCardShouldContain(carName) {
    cy.contains('p.car_name', carName).should('be.visible');
  }

  firstCarNameShouldBeVisible(carName) {
    this.carCardShouldContain(carName);
  }

  fuelExpenseButtonShouldBeVisible() {
    cy.contains('button', 'Add fuel expense').should('be.visible');
  }
}

export default GaragePage;