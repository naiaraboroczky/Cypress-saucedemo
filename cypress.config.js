const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 1500000,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/v1/index.html',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
