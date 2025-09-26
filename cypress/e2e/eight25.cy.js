/// <reference types="cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Eight25Media Website Tests', () => {

  // 1. Homepage Test
  it('Should load homepage and check title', () => {
    cy.visit('https://www.eight25media.com/')
    cy.title().should('include', 'eight25')
  })

  // 2. Navigation Test: Work page
  it('Should navigate to Work page and verify content', () => {
    cy.visit('https://www.eight25media.com/')
    cy.contains('Work').click({ force: true })
    cy.url().should('include', '/eight25-work/')
    cy.contains('Work').should('be.visible') // robust check
  })

  // 3. Contact Form Interaction
  // there are site sometimes throws JavaScript errors
  it('Should fill out the contact form', () => {
    cy.visit('https://www.eight25media.com/contact-us/', { failOnStatusCode: false })

    // Adjust these selectors if necessary to match live site
    cy.get('input[name="your-name"]').type('Test User')
    cy.get('input[name="your-email"]').type('testuser@example.com')
    cy.get('textarea[name="your-message"]').type('This is a test message from Cypress.')

    // Assert values were entered correctly
    cy.get('input[name="your-name"]').should('have.value', 'Test User')
    cy.get('input[name="your-email"]').should('have.value', 'testuser@example.com')
    cy.get('textarea[name="your-message"]').should('have.value', 'This is a test message from Cypress.')
  })

  // 4. Mobile Responsive Check
  it('Should show mobile menu on small viewport', () => {
    cy.viewport(375, 667) // iPhone X dimensions
    cy.visit('https://www.eight25media.com/')

    // Wait for the mobile menu button to appear
    cy.get('button.mega-toggle', { timeout: 10000 }).should('be.visible')
  })

})
