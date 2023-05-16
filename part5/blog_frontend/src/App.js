import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import userService from './services/users'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [createVisible, setCreateVisible] = useState(false)
  const [createBlogSuccess, setCreateBlogSuccess] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('username', username)
    console.log('password', password)

    const pass_user = {
      username,
      password,
    }

    userService
      .logIn(pass_user)
      .then((response) => {
        console.log('response', response)

        setUser(response)
        localStorage.setItem('token', response.token)
      })
      .catch((e) => {
        console.log('error', e)
        setError(e.response.data.error)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  const handleLogout = () => {
    console.log('handleLogout')
    setUser(null)
    localStorage.removeItem('token')
  }

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const sortBlogs = () => {
    return blogs.sort((a, b) => b.likes.length - a.likes.length)
  }

  const handleCreate = (event, title, author, url) => {
    event.preventDefault()
    const new_blog = {
      title,
      author,
      url,
    }

    blogService.createItem(new_blog).then((response) => {
      console.log('response', response)
      setMessage(`a new blog ${title} by ${author} added`)
      setCreateBlogSuccess(true)

      setTimeout(() => {
        setMessage(null)
        setCreateBlogSuccess(false)
      }, 5000)

      getBlogs()
    })
  }

  const handleBlogLike = (blog, checkLike, title, author) => {
    console.log('handleBlogLike', blog, checkLike())

    if (checkLike()) {
      blogService
        .updateItem(blog.id, {
          likes: 'false',
        })
        .then((response) => {
          console.log('response', response)
          setMessage(`a new blog ${title} by ${author} updated`)

          setTimeout(() => {
            setMessage(null)
          }, 5000)

          getBlogs()
        })
        .catch((e) => {
          console.error(e)
          setError(e.response.data.error)

          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    } else {
      blogService
        .updateItem(blog.id, {
          likes: 'true',
        })
        .then((response) => {
          console.log('response', response)
          setMessage(`a new blog ${title} by ${author} updated`)

          setTimeout(() => {
            setMessage(null)
          }, 5000)

          getBlogs()
        })
        .catch((e) => {
          console.error(e)
          setError(e.response.data.error)

          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const handleDelete = (blog) => {
    console.log('handleDelete', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteItem(blog.id)
        .then((response) => {
          console.log('response', response)
          setMessage(`${blog.title} by ${blog.author} is deleted!!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          getBlogs()
        })
        .catch((e) => {
          console.error(e)
          setError(e.response.data.error)

          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    console.log('user', user)
  }, [user])

  const loginForm = () => {
    return (
      <div>
        <h2> Log in to application </h2>
        {message ? (
          <h3 className='message'> {message} </h3>
        ) : error ? (
          <h3 className='error'> {error} </h3>
        ) : (
          <h3 className='no_message'></h3>
        )}
        <Login
          handleSubmit={handleSubmit}
          setUserName={setUserName}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const blogList = () => {
    const hideWhenVisible = {
      display: createVisible ? 'none' : '',
    }
    const showWhenVisible = {
      display: createVisible ? '' : 'none',
    }

    return (
      <div>
        <h2> blogs </h2>
        {message ? (
          <h3 className='message'> {message} </h3>
        ) : error ? (
          <h3 className='error'> {error} </h3>
        ) : (
          <h3 className='no_message'></h3>
        )}
        <div className='blog_username'>
          <h3>
            {user.username} logged in
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
            user={user}
          />
        ))}
      </div>
    )
  }

  if (user === null) {
    return loginForm()
  } else {
    return blogList()
  }
}

export default App
