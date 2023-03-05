import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
