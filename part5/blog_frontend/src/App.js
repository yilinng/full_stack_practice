import { useState, useContext } from 'react'
import NotificationContext from './notificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import Message from './components/Message'
import './index.css'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const [createVisible, setCreateVisible] = useState(false)
  const [createBlogSuccess, setCreateBlogSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [err, setErr] = useState('')

  const hideWhenVisible = {
    display: createVisible ? 'none' : '',
  }
  const showWhenVisible = {
    display: createVisible ? '' : 'none',
  }

  const handleLogout = () => {
    // console.log('handleLogout')

    const token = localStorage.getItem('token')

    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: token,
    })

    localStorage.removeItem('token')
  }

  const sortBlogs = () => {
    return blogs.sort((a, b) => b.likes.length - a.likes.length)
  }

  const newBlogMutation = useMutation(blogService.createItem, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      dispatch({
        type: 'SUCCESS',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
        setCreateBlogSuccess(false)
      }, 5000)
    },
  })

  const handleCreate = (event, title, author, url) => {
    event.preventDefault()
    const new_blog = {
      title,
      author,
      url,
    }

    newBlogMutation.mutate(new_blog)
  }

  const updateBlogMutation = useMutation(blogService.updateItem, {
    onSuccess: (updateBlog) => {
      //const blogs = queryClient.getQueryData('blogs')
      dispatch({
        type: 'SUCCESS',
        payload: `a new blog ${updateBlog.title} by ${updateBlog.author} updated`,
      })

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
        setCreateBlogSuccess(false)
      }, 5000)
    },
  })

  const handleBlogLike = (blog, checkLike) => {
    console.log('handleBlogLike', blog, checkLike())

    if (checkLike()) {
      updateBlogMutation.mutate({ ...blog, likes: 'false' })
    } else {
      updateBlogMutation.mutate({ ...blog, likes: 'true' })
    }
  }

  const handleDelete = (blog) => {
    console.log('handleDelete', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteItem(blog)
        .then((response) => {
          console.log('response', response)

          dispatch({
            type: 'SUCCESS',
            payload: `${blog.title} by ${blog.author} is deleted!!`,
          })
          setTimeout(() => {
            dispatch({
              type: 'CLEAR',
            })
          }, 5000)
        })
        .catch((e) => {
          console.error(e)

          dispatch({
            type: 'ERROR',
            payload: e.response.data.error,
          })

          setTimeout(() => {
            dispatch({
              type: 'CLEAR',
            })
          }, 5000)
        })
    }
  }

  const { isLoading, isError, data, error } = useQuery(
    'blogs',
    blogService.getAll
  )
  console.log('isLoading, isError, data ', isLoading, isError, data, error)

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = data

  console.log('notification', notification)

  if (notification && 'user' in notification && notification.user) {
    return (
      <div>
        <h2> blogs </h2>

        <Message message={notification.message} error={notification.error} />

        <div className="blog_username">
          <h3>
            {notification.user.username} logged in
            <button onClick={handleLogout}> logout </button>
          </h3>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
            handleCreate={handleCreate}
            createBlogSuccess={createBlogSuccess}
          />
          <button onClick={() => setCreateVisible(false)}> cancel </button>
        </div>
        {sortBlogs().map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLike={handleBlogLike}
            handleDelete={handleDelete}
            user={notification.user}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2> Log in to application </h2>
        <Message message={notification.message} error={notification.error} />
        <Login dispatch={dispatch} />
      </div>
    )
  }
}

export default App
