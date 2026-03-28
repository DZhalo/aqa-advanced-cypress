import HomePage from '../pages/HomePage';
import GaragePage from '../pages/GaragePage';
import AddCarModal from '../pages/AddCarModal';
import FuelExpensesPage from '../pages/FuelExpensesPage';
import AddExpenseModal from '../pages/AddExpenseModal';

describe('Garage and fuel expenses scenarios', () => {
  const homePage = new HomePage();
  const garagePage = new GaragePage();
  const addCarModal = new AddCarModal();
  const fuelExpensesPage = new FuelExpensesPage();
  const addExpenseModal = new AddExpenseModal();

  let testData;

  beforeEach(() => {
    cy.fixture('garageData').then((data) => {
      testData = data;
    });

    homePage.visit();
    cy.login();
    garagePage.pageShouldBeOpened();
  });

  it('should add a car in garage', () => {
    garagePage.clickAddCarButton();
    addCarModal.modalShouldBeOpened();

    addCarModal.addCar({
      brand: testData.car.brand,
      model: testData.car.model,
      mileage: testData.car.mileage,
    });

    garagePage.pageShouldBeOpened();
    garagePage.firstCarNameShouldBeVisible(testData.car.name);
    garagePage.fuelExpenseButtonShouldBeVisible();
  });

  it('should add fuel expense to created car', () => {
    garagePage.clickAddCarButton();
    addCarModal.modalShouldBeOpened();

    addCarModal.addCar({
      brand: testData.car.brand,
      model: testData.car.model,
      mileage: testData.car.mileage,
    });

    garagePage.pageShouldBeOpened();
    garagePage.clickFuelExpensesHeaderLink();

    fuelExpensesPage.pageShouldBeOpened();
    fuelExpensesPage.selectedVehicleShouldBe(testData.car.name);
    fuelExpensesPage.clickAddExpenseButton();

    addExpenseModal.modalShouldBeOpened();
    addExpenseModal.selectedVehicleShouldBe(testData.car.name);
    addExpenseModal.addExpense({
    date: testData.expense.date,
    mileage: testData.expense.mileage,
    liters: testData.expense.liters,
    totalCost: testData.expense.totalCost,
    });

    fuelExpensesPage.pageShouldBeOpened();
    fuelExpensesPage.selectedVehicleShouldBe(testData.car.name);
    fuelExpensesPage.expenseRowShouldContain({
      date: testData.expense.date,
      mileage: testData.expense.mileage,
      liters: `${testData.expense.liters}L`,
      totalCost: testData.expense.totalCost,
    });
  });
});