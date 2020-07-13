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

})