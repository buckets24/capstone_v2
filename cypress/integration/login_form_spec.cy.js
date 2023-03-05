describe('Header login button', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('if the user is not logged in, clicking on the login page should open the login form', () => {
    cy.findByTestId('login-mobile').click().type('9216927963')
    cy.findByTestId('login-password').click().type('password1234')
    cy.findByText('Login').click()
  })

  // TODO: fake auth
  // cy.setupFakeAuth();
})
