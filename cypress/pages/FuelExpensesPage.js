class FuelExpensesPage {
  pageShouldBeOpened() {
    cy.url().should('include', '/panel/expenses');
    cy.get('h1').should('have.text', 'Fuel expenses');
  }

  getAddExpenseButton() {
    return cy.get('button.btn.btn-primary').contains('Add an expense');
  }

  clickAddExpenseButton() {
    this.getAddExpenseButton().click();
  }

  getVehicleDropdownButton() {
    return cy.get('#carSelectDropdown');
  }

  selectedVehicleShouldBe(vehicleName) {
    this.getVehicleDropdownButton().should('contain.text', vehicleName);
  }

  expenseRowShouldContain({ date, mileage, liters, totalCost }) {
    const formattedTotalCost = `${Number(totalCost).toFixed(2)} USD`;

    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain.text', date);
      cy.get('td').eq(1).should('contain.text', mileage);
      cy.get('td').eq(2).should('contain.text', liters);
      cy.get('td').eq(3).should('contain.text', formattedTotalCost);
    });
  }
}

export default FuelExpensesPage;