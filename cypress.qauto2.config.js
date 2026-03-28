const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    env: {
      userEmail: 'hw21qauto2@test.com',
      userPassword: 'Aa12345!',
      basicAuthUsername: 'guest',
      basicAuthPassword: 'welcome2qauto',
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
  },
});