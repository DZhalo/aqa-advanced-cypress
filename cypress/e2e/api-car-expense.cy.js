import HomePage from '../pages/HomePage';
import GaragePage from '../pages/GaragePage';
import AddCarModal from '../pages/AddCarModal';
import FuelExpensesPage from '../pages/FuelExpensesPage';

describe('API testing with Cypress', () => {
  const homePage = new HomePage();
  const garagePage = new GaragePage();
  const addCarModal = new AddCarModal();
  const fuelExpensesPage = new FuelExpensesPage();

  let testData;
  let apiReportedAt;
  let uiReportedAt;
  let createdCarId;

  beforeEach(() => {
    cy.fixture('apiTestData').then((data) => {
      testData = data;
    });

    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    apiReportedAt = `${yyyy}-${mm}-${dd}`;
    uiReportedAt = `${dd}.${mm}.${yyyy}`;

    homePage.visit();
    cy.login();
    garagePage.pageShouldBeOpened();
  });

 it('should create car via UI, validate it via GET /api/cars, create expense via API and validate it in UI', () => {
  cy.intercept('POST', '/api/cars').as('createCar');

  garagePage.clickAddCarButton();
  addCarModal.modalShouldBeOpened();

  addCarModal.addCar({
    brand: testData.car.brand,
    model: testData.car.model,
    mileage: testData.car.mileage,
  });

  cy.wait('@createCar').then((interception) => {
    expect(interception.response.statusCode).to.eq(201);

    const responseBody = interception.response.body;
    const createdCarId = responseBody.data.id;

    expect(createdCarId).to.be.a('number');

    expect(responseBody.data).to.include({
      carBrandId: testData.car.carBrandId,
      carModelId: testData.car.carModelId,
      initialMileage: testData.car.mileage,
      mileage: testData.car.mileage,
      brand: testData.car.brand,
      model: testData.car.model,
    });

    cy.request({
      method: 'GET',
      url: '/api/cars',
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');

      const createdCar = response.body.data.find((car) => car.id === createdCarId);

      expect(createdCar).to.exist;
      expect(createdCar).to.include({
        id: createdCarId,
        carBrandId: testData.car.carBrandId,
        carModelId: testData.car.carModelId,
        initialMileage: testData.car.mileage,
        mileage: testData.car.mileage,
        brand: testData.car.brand,
        model: testData.car.model,
      });
    });

    cy.createExpenseApi({
      carId: createdCarId,
      reportedAt: apiReportedAt,
      mileage: testData.expense.mileage,
      liters: testData.expense.liters,
      totalCost: testData.expense.totalCost,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq('ok');

      expect(response.body.data).to.include({
        carId: createdCarId,
        reportedAt: apiReportedAt,
        mileage: testData.expense.mileage,
        liters: testData.expense.liters,
        totalCost: testData.expense.totalCost,
      });
    });

    garagePage.clickFuelExpensesHeaderLink();
    fuelExpensesPage.pageShouldBeOpened();
    //fuelExpensesPage.selectVehicleFromDropdown(testData.car.name);

    fuelExpensesPage.expenseRowShouldContain({
      date: uiReportedAt,
      mileage: testData.expense.mileage,
      liters: `${testData.expense.liters}L`,
      totalCost: testData.expense.totalCost,
    });
  });
 });
});