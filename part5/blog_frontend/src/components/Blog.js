import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogLike, handleDelete, user }) => {
  const [viewVisible, setViewVisible] = useState(false)

  console.log('blog', blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const checkLike = () => {
    return blog.likes.includes(blog.user.id)
  }

  //const hideWhenVisible = { display: viewVisible ? 'none' : '' };
  const showWhenVisible = { display: viewVisible ? '' : 'none' }
  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button
        onClick={() => setViewVisible(!viewVisible)}
        className="togglableContent showBtn"
      >
        {viewVisible ? 'hide' : 'view'}
      </button>
      <div className="content" style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes.length}
          <button
            onClick={() => handleBlogLike(blog, checkLike)}
            className={
              checkLike()
                ? 'togglableContent likedBtn'
                : 'togglableContent likeBtn'
            }
          >
            {checkLike() ? 'liked' : 'like'}
          </button>
        </p>
        <p>{blog.author}</p>
        {user && user.username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)} className="deleteBtn">
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  handleBlogLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
