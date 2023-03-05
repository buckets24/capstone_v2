import '@testing-library/cypress/add-commands'
// find commands here: https://testing-library.com/docs/cypress-testing-library/intro/

Cypress.Commands.add('setupFakeAuth', () => {
  cy.setCookie('fake-auth', 'true')
  cy.setCookie('fake-user', '1234567890')
  cy.setCookie('fake-session-token', '0a1b2c3d3f')
})
