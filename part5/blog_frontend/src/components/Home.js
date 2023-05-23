import PropTypes from 'prop-types'
import CreateBlog from './CreateBlog'
import Message from './Message'
import Login from './Login'
import { Link } from 'react-router-dom'
import '../index.css'

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
  const sortBlogs = () => {
    return blogs.sort((a, b) => b.likes.length - a.likes.length)
  }

  if (notification && 'user' in notification && notification.user) {
    return (
      <div className="home">
        <h2>blog app</h2>

        <Message message={notification.message} error={notification.error} />

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
          <button onClick={() => setCreateVisible(false)}>cancel</button>
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
      <div>
        <h2> Log in to application </h2>
        <Message message={notification.message} error={notification.error} />
        <Login dispatch={dispatch} />
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
