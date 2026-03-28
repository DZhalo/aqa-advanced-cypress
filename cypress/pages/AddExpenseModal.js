class AddExpenseModal {
  getModalTitle() {
    return cy.get('h4.modal-title');
  }

  getVehicleSelect() {
    return cy.get('#addExpenseCar');
  }

  getReportDateInput() {
    return cy.get('#addExpenseDate');
  }

  getMileageInput() {
    return cy.get('#addExpenseMileage');
  }

  getLitersInput() {
    return cy.get('#addExpenseLiters');
  }

  getTotalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  getAddButton() {
    return cy.get('.modal-footer button.btn.btn-primary');
  }

  modalShouldBeOpened() {
    this.getModalTitle().should('have.text', 'Add an expense');
  }

  selectedVehicleShouldBe(vehicleName) {
    this.getVehicleSelect().find('option:selected').should('have.text', vehicleName);
  }

  typeReportDate(date) {
    this.getReportDateInput().clear().type(date);
  }

  typeMileage(mileage) {
    this.getMileageInput().clear().type(`${mileage}`);
  }

  typeLiters(liters) {
    this.getLitersInput().clear().type(`${liters}`);
  }

  typeTotalCost(totalCost) {
    this.getTotalCostInput().clear().type(`${totalCost}`);
  }

  clickAddButton() {
    this.getAddButton().click();
  }

  addExpense({ date, mileage, liters, totalCost }) {
    this.typeReportDate(date);
    this.typeMileage(mileage);
    this.typeLiters(liters);
    this.typeTotalCost(totalCost);
    this.clickAddButton();
  }
}

export default AddExpenseModal;