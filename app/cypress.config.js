const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "http://localhost:1234",
    screenshotOnRunFailure: false,
    supportFile: false,
    video: false,
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
