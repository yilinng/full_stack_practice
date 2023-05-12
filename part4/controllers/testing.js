const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  //add new user

  const saltRounds = 10
  const passwordHash = await bcrypt.hash('salainen', saltRounds)

  const user = new User({
    name: 'test name',
    username: 'mluukkai',
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = testingRouter
