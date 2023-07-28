// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('token', body.token)
    cy.visit('')
  })
})

Cypress.Commands.add('signup', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username,
    name,
    password,
  }).then(({ body }) => {
    console.log('from signup', body)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('create new blog').click()
  cy.get('#title').clear().type(title)
  cy.get('#author').clear().type(author)
  cy.get('#url').clear().type(url)

  cy.get('.create_Btn').click()

  //cy.visit('')
  /*
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(({ body }) => {
    console.log('blog post', body)
    cy.visit('')
  })
  */
})
