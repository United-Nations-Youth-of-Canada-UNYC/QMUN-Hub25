import { purge, enterUsername, enterCurrentPassword, enterNewPassword } from './utils'

const CHAIRPERSON = 'Test chairperson'
const TOPIC = 'Test topic'
const COMMITTEE = 'Test committee'
const CONFERENCE = 'Test conference'

describe('Run through creating a new committee', function () {
  before(function () {
    purge()
    cy.visit("/")
  })

  it('visits the homepage and navigates to the onboarding screen', function () {
    cy.contains("Create a committee").click()
    cy.url().should('include', '/onboard')
  })

  it('attempts to create an account that is already in use, and then logs in', function () {
    cy.get('button').contains('Log in').then(() => {
      cy.contains('Create account').click()

      enterUsername()
      enterNewPassword()

      cy.get('button').contains('Create account').click()

      cy.contains('in use by another account')

      cy.get('a').contains('Back to login').click()

      enterCurrentPassword()

      cy.get('button').contains('Log in').click()
    })
  })

  it('creates a new Security Council committee', function () {
    cy.get('div')
      .contains('Template to skip manual member creation (optional)')
      .type(TEMPLATE + '{enter}')
      .contains(TEMPLATE)

    cy.get('input[placeholder="Committee name"')
      .should('have.value', TEMPLATE)

    cy.get('input[placeholder="Committee topic"')
      .type(TOPIC)
      .should('have.value', TOPIC)

    cy.get('input[placeholder="Name(s) of chairperson or chairpeople"')
      .type(CHAIRPERSON)
      .should('have.value', CHAIRPERSON)

    cy.get('input[placeholder="Conference name"')
      .type(CONFERENCE)
      .should('have.value', CONFERENCE)

    const createButton = cy.get('button').contains('Create committee')

    createButton.should('not.be.disabled')
    createButton.click()

    cy.url().should('include', '/committees')

    cy.get('input[placeholder="Committee name"')
      .should('have.value', TEMPLATE)

    cy.get('input[placeholder="Committee topic"')
      .should('have.value', TOPIC)

    cy.get('input[placeholder="Name(s) of chairperson or chairpeople"')
      .should('have.value', CHAIRPERSON)

  })

  it('observes the templated prepopulated member list for the Security Council', function () {
    const setupCommitteeButton = cy.get('a').contains('Setup committee')

    setupCommitteeButton.click()
    cy.url().should('include', '/setup')
    cy.wait(2000)

    cy.get('table').should('contain', 'China')
    cy.get('table').should('contain', 'France')
    cy.get('table').should('contain', 'Russia')
    cy.get('table').should('contain', 'United States')
    cy.get('table').should('contain', 'United Kingdom')

    cy.get('table').eq(1).contains('Total').siblings().should('contain', '15')
  })
})
