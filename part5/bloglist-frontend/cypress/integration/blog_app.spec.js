const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    
    cy.visit('http://localhost:3000')
  })

  describe('Login', function(){
    it('form is shown', function() {
      cy.contains('log in')
      cy.contains('username')
      cy.contains('password')
    })
  
    it('is successful with correct credentials', function () {
      cy.get('#usernameInput')
        .type('testuser')
      cy.get('#passwordInput')
        .type('password')
  
      cy.get('#loginButton').click()
      
      cy.contains('Test User logged in')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#usernameInput')
        .type('testuser')
      cy.get('#passwordInput')
        .type('wrong')
        
      cy.get('#loginButton').click()
      
      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('a blog can be created', function() {
      cy.get('.blogFormToggle')
        .click()
      
      cy.get('#titleInput')
        .type('New Blog from Cypress')
      cy.get('#authorInput')
        .type('Cypress Runner')
      cy.get('#urlInput')
        .type('testurl.com')

      cy.get('#createBlog')
        .click()

      cy.contains('New Blog from Cypress')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'New Blog from Cypress',
          author: 'Cypress Runner',
          url: 'testurl.com'
        })
      })

      it('can be liked', function(){
        cy.contains('New Blog from Cypress').parent().as('newBlog')
        cy.get('@newBlog').get('.toggleViewButton').click()
        cy.get('@newBlog').get('.likeButton').click()
        cy.get('@newBlog').contains('likes 1')
      })
    })
  })

})