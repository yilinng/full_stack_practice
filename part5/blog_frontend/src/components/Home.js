import { useState } from 'react'
import PropTypes from 'prop-types'
import CreateBlog from './CreateBlog'
import Message from './Message'
import Login from './Login'
import { Link } from 'react-router-dom'
import '../index.css'
import Signup from './Signup'

const Home = ({
  setCreateVisible,
  createBlogSuccess,
  hideWhenVisible,
  showWhenVisible,
  handleCreate,
  notification,
  blogs,
  dispatch,
}) => {
  const [showSignup, setShowSignup] = useState(false)

  const sortBlogs = () => {
    return blogs.sort((a, b) => b.likes.length - a.likes.length)
  }

  if (notification && 'user' in notification && notification.user) {
    return (
      <div className="home">
        <h2>blog app</h2>

        <Message message={notification.message} error={notification.error} />

        <div style={hideWhenVisible} className="createBtn">
          <button onClick={() => setCreateVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
            handleCreate={handleCreate}
            createBlogSuccess={createBlogSuccess}
          />
          <button
            className="cancel_Btn"
            onClick={() => setCreateVisible(false)}
          >
            cancel
          </button>
        </div>
        <div className="blogList">
          {blogs.length &&
            sortBlogs().map((blog) => (
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="login_signup">
        {showSignup ? (
          ''
        ) : (
          <div className="login_page">
            <h1> Login to Your application </h1>
            <Message
              message={notification.message}
              error={notification.error}
            />
            <Login dispatch={dispatch} />
          </div>
        )}
        <div className={showSignup ? 'show signup_page' : 'signup_page'}>
          <h1>
            {showSignup
              ? 'If you already has an account, just sign in.'
              : 'New Here?'}
          </h1>

          <h3>
            {showSignup
              ? ''
              : 'sign up and discover a great amount of new Information!'}
          </h3>

          <div className="signBtn">
            <button type="button" onClick={() => setShowSignup(!showSignup)}>
              {showSignup ? 'log in' : 'sign up'}
            </button>
          </div>
        </div>
        {showSignup ? (
          <div className="show_signup_page">
            <h1>Create your Account </h1>
            <Message
              message={notification.message}
              error={notification.error}
            />

            <Signup dispatch={dispatch} />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Home.prototype = {
  setCreateVisible: PropTypes.func.isRequired,
  createBlogSuccess: PropTypes.func.isRequired,
  hideWhenVisible: PropTypes.func.isRequired,
  showWhenVisible: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Home
