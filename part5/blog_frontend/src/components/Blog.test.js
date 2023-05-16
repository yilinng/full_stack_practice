import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
    url: 'test@test.com',
    likes: ['test1', 'test2'],
    user: {
      id: 'testid',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
    url: 'test@test.com',
    likes: ['test1', 'test2'],
    user: {
      id: 'testid',
    },
  }

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.content')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.content')
    expect(div).toHaveStyle('display: block')
    expect(div).toHaveTextContent('test@test.com')
    expect(div).toHaveTextContent(`likes ${blog.likes.length}`)
  })
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test author',
    url: 'test@test.com',
    likes: ['test1', 'test2'],
    user: {
      id: 'testid',
    },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleBlogLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
