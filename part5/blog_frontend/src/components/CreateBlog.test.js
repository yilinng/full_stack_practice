import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
  //https://stackoverflow.com/questions/62216232/error-not-implemented-htmlformelement-prototype-submit
  const handleCreate = jest.fn((e) => e.preventDefault())
  const user = userEvent.setup()

  const { container } = render(<CreateBlog handleCreate={handleCreate} />)

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')

  const sendButton = screen.getByText('create')

  await user.type(title, 'testing a title...')
  await user.type(author, 'testing a author')
  await user.type(url, 'test@test.com')

  await user.click(sendButton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  //expect(handleCreate.mock.calls[0][0].content).toBe('testing a form...')
})
