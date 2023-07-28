import { useState, useContext } from 'react'
import NotificationContext from './notificationContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import UserBlog from './components/UserBlog'
import Home from './components/Home'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

import blogService from './services/blogs'
import userService from './services/users'

import './index.css'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const [createVisible, setCreateVisible] = useState(false)
  const [createBlogSuccess, setCreateBlogSuccess] = useState(false)

  const hideWhenVisible = {
    display: createVisible ? 'none' : '',
  }
  const showWhenVisible = {
    display: createVisible ? '' : 'none',
  }

  const handleLogout = () => {
    const token = localStorage.getItem('token')

    dispatch({
      type: 'LOGOUT_SUCCESS',
      payload: token,
    })

    localStorage.removeItem('token')
  }

  const newBlogMutation = useMutation(blogService.createItem, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')

      if (blogs.length) {
        queryClient.setQueryData('blogs', blogs.concat(newBlog))
      }
      dispatch({
        type: 'SUCCESS',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })

      setCreateBlogSuccess(true)

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
      const blogs = queryClient.getQueryData('blogs')
      const filterBlogs = blogs.filter((blog) => blog.id !== updateBlog.id)

      queryClient.setQueriesData('blogs', filterBlogs.concat(updateBlog))
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

  const deleteBlogMutation = useMutation(blogService.deleteItem, {
    onSuccess: (deleteBlog) => {
      console.log('deleteBlog', deleteBlog)
      const blogs = queryClient.getQueryData('blogs')
      console.log('delete success blogs', blogs)

      const filteredBlog = blogs.filter((blog) => blog.id !== deleteBlog.id)
      console.log('delete success  filteredBlog', filteredBlog)

      queryClient.setQueriesData('blogs', filteredBlog)
      dispatch({
        type: 'SUCCESS',
        payload: `${deleteBlog.title} by ${deleteBlog.author} is deleted!!`,
      })

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
        setCreateBlogSuccess(false)
      }, 5000)
    },
    onError: (err) => {
      console.log('delete err', err)
    },
  })

  const handleDelete = (blog) => {
    if (window.confirm(`Do you want to delete ${blog.title} ?`)) {
      deleteBlogMutation.mutate(blog)
    }
  }
  //get usersdata
  const getUserData = useQuery('users', userService.getAllUsers)

  if (notification && notification.user) {
    console.log('getUserData', getUserData)
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

  return (
    <Router>
      <div className="container">
        <Navbar
          notification={notification}
          handleLogout={handleLogout}
          dispatch={dispatch}
        />
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blogs={blogs}
                handleBlogLike={handleBlogLike}
                handleDelete={handleDelete}
                notification={notification}
                dispatch={dispatch}
              />
            }
          />
          <Route path="/users" element={<Users users={getUserData.data} />} />
          <Route
            path="/users/:id"
            element={<UserBlog users={getUserData.data} />}
          />
          <Route
            path="/"
            element={
              <Home
                setCreateVisible={setCreateVisible}
                hideWhenVisible={hideWhenVisible}
                showWhenVisible={showWhenVisible}
                createBlogSuccess={createBlogSuccess}
                handleCreate={handleCreate}
                notification={notification}
                blogs={blogs}
                dispatch={dispatch}
              />
            }
          />
        </Routes>
      </div>
      <div className="footer">
        <i>Blogs app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}

export default App
