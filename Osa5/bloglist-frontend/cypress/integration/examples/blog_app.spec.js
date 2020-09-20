describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Bill',
      username: 'Bill',
      password: 'Bill'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {

    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Bill')
    cy.get('#login-button').click()

    cy.contains('Logged in as Bill')
    cy.contains('new blog')
  })

  it('wrong password can not login',function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Kill')
    cy.get('#login-button').click()

    cy.get('new blog').should('not.exist');

  })
  it('can create blog', function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Bill')

    cy.get('#login-button').click()

    cy.contains('new blog').click()
    cy.get('#title').type('blog title')
    cy.get('#author').type('some woman')
    cy.get('#url').type('menaiset.fi')

    cy.contains('create').click()

    cy.contains('blog title')
    cy.contains('some woman')
  })
  it('can like blogs', function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Bill')

    cy.get('#login-button').click()

    cy.contains('new blog').click()
    cy.get('#title').type('blog title')
    cy.get('#author').type('some woman')
    cy.get('#url').type('menaiset.fi')

    cy.contains('create').click()

    cy.contains('blog title')
    cy.contains('some woman')

    cy.contains('view').click()
    cy.contains('likes: 0')

    cy.contains('like').click()
    cy.contains('likes: 0')


  })

  it('can delete blogs', function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Bill')

    cy.get('#login-button').click()

    cy.contains('new blog').click()
    cy.get('#title').type('blog title')
    cy.get('#author').type('some woman')
    cy.get('#url').type('menaiset.fi')

    cy.contains('create').click()

    cy.contains('blog title')
    cy.contains('some woman')

    cy.contains('view').click()
    cy.contains('delete').click()

    cy.get('blog title').should('not.exist');
    cy.get('some woman').should('not.exist');

  })
  it('sorted by likes', function() {
    cy.contains('login').click()

    cy.get('#username').type('Bill')
    cy.get('#password').type('Bill')

    cy.get('#login-button').click()

    cy.contains('new blog').click()
    cy.get('#title').type('blog title')
    cy.get('#author').type('some woman')
    cy.get('#url').type('menaiset.fi')

    cy.contains('create').click()

    cy.contains('new blog').click()
    cy.get('#title').type('new title')
    cy.get('#author').type('same woman')
    cy.get('#url').type('menaiset.fi')

    cy.contains('create').click()

    cy.contains('some woman')
    cy.contains('same note').find('view').click()
  })
})