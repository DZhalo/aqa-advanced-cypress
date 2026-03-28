class AddCarModal {
  getModalTitle() {
    return cy.get('h4.modal-title');
  }

  getBrandSelect() {
    return cy.get('#addCarBrand');
  }

  getModelSelect() {
    return cy.get('#addCarModel');
  }

  getMileageInput() {
    return cy.get('#addCarMileage');
  }

  getAddButton() {
    return cy.get('.modal-footer button.btn.btn-primary');
  }

  getCancelButton() {
    return cy.get('.modal-footer button.btn.btn-secondary');
  }

  modalShouldBeOpened() {
    this.getModalTitle().should('have.text', 'Add a car');
  }

  selectBrand(brand) {
    this.getBrandSelect().select(brand);
  }

  selectModel(model) {
    this.getModelSelect().select(model);
  }

  typeMileage(mileage) {
    this.getMileageInput().clear().type(`${mileage}`);
  }

  clickAddButton() {
    this.getAddButton().click();
  }

  addCar({ brand, model, mileage }) {
    this.selectBrand(brand);
    this.selectModel(model);
    this.typeMileage(mileage);
    this.clickAddButton();
  }

  addButtonShouldBeDisabled() {
    this.getAddButton().should('be.disabled');
  }

  addButtonShouldBeEnabled() {
    this.getAddButton().should('not.be.disabled');
  }
}

export default AddCarModal;