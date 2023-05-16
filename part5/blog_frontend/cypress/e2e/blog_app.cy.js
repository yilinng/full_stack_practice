describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.login({ username: 'mluukkai', password: 'salainen' })
    cy.signup({
      username: 'test',
      name: 'test',
      password: 'test',
    })
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'invalid username or password')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress@cypress.com')

      cy.get('.create_Btn').click()
      cy.get('.message').contains('a new blog cypress title by cypress added')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another note',
          author: 'test another',
          url: 'another@url.com',
        })

        cy.contains('cancel').click()

        cy.createBlog({
          title: 'second note',
          author: 'test second',
          url: 'second@url.com',
        })

        cy.contains('cancel').click()

        cy.createBlog({
          title: 'third note',
          author: 'test third',
          url: 'third@url.com',
        })

        cy.contains('cancel').click()
      })

      it('users can like a blog', function () {
        cy.contains('another note')

        cy.contains('view').click()

        cy.contains('like').click()

        // cy.get('.message').contains(
        //   'a new blog another note by test another updated'
        // )
      })

      it('user who created a blog can delete it', function () {
        cy.contains('second note')

        cy.contains('view').click()

        cy.contains('remove').click()

        // cy.get('.message').contains('second note by test second is deleted!!')
      })

      it('only the creator can see the delete button of a blog, not anyone else', function () {
        cy.contains('logout').click()

        cy.contains('login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.contains('test logged in')

        cy.contains('third note')

        cy.contains('view').click()

        cy.get('.content').should('not.contain', 'remove')
      })

      it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.contains('logout').click()

        cy.contains('login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login-button').click()

        cy.contains('test logged in')

        cy.contains('third note')

        cy.contains('view').click()

        cy.contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'likes 1')
        cy.get('.blog').eq(1).should('contain', 'likes 0')
      })
    })
  })
})
