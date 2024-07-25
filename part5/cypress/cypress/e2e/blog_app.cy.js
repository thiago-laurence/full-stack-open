describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    const user = {
      name: 'Thiago Laurence',
      username: 'thiago-laurence',
      password: '123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, user)
    cy.visit('')
  })
 
  it('Login form is shown', function() {
    cy.contains('Log in to application').should('be.visible')
    cy.contains('Blogs').should('not.exist')
  })

  describe('Login: ', function() {
    it('success with correct credentials', function() {
      cy.login({ username: "thiago-laurence", password: "123" })

      cy.contains('Thiago Laurence logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('thiago-laurence')
      cy.get('#password').type('wrong')
      cy.get('button').click()

      cy.contains('invalid username or password').should('be.visible').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: "thiago-laurence", password: "123" })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'Blog title', author: 'Author name', url: 'http://example.com' })

      cy.contains('Blog title').should('be.visible')
    })

    it('a blog can be liked', function() {
      cy.createBlog({ title: 'Blog title', author: 'Author name', url: 'http://example.com' })

      cy.contains('View').click()
      cy.get('[data-testid="blog-like"]').should('contain', '0 likes')
      cy.contains('Like').click()
      cy.get('[data-testid="blog-like"]').should('contain', '1 likes')
      cy.contains('like added').should('be.visible')
    })

    it('a blog can be removed by the user who created it', function() {
      cy.createBlog({ title: 'Blog title', author: 'Author name', url: 'http://example.com' })

      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.contains('Blog title').should('not.exist')
      cy.contains('blog removed').should('be.visible')
    })

    it('a blog cannot be removed by another user', function() {
      cy.createBlog({ title: 'Blog title', author: 'Author name', url: 'http://example.com' })

      cy.contains('Logout').click()
      const user = {
        name: 'Another user',
        username: 'another-user',
        password: '123'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/api/users/`, user)
      cy.login({ username: 'another-user', password: '123' })
      cy.contains('View').click()
      cy.contains('Remove').should('not.exist')
    })

    it('blogs are ordered according to likes', function() {
      cy.createBlog({ title: 'Blog title 1', author: 'Author name 1', url: 'http://example.com' })
      cy.createBlog({ title: 'Blog title 2', author: 'Author name 2', url: 'http://example.com' })
      cy.createBlog({ title: 'Blog title 3', author: 'Author name 3', url: 'http://example.com' })

      cy.get('.blog').eq(2).contains('View').click() // Blog title 3
      cy.get('.blog').eq(2).contains('Like').click()
      cy.get('.blog').eq(0).contains('1 likes').should('be.visible') // Blog title 3 yet because the sorted list refresh the order
      cy.get('.blog').eq(0).contains('Hide').click()

      cy.get('.blog').eq(1).contains('View').click() // Blog title 1
      cy.get('.blog').eq(1).contains('Like').click()
      cy.get('.blog').eq(1).contains('1 likes').should('be.visible')
      cy.get('.blog').eq(1).contains('Like').click()
      cy.get('.blog').eq(0).contains('2 likes').should('be.visible') // Blog title 1 yet
      cy.get('.blog').eq(0).contains('Hide').click()

      cy.get('.blog').eq(0).contains('Blog title 1')
      cy.get('.blog').eq(1).contains('Blog title 3')
      cy.get('.blog').eq(2).contains('Blog title 2')
    })
  })
})