import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import Message from './Message'
import '../index.css'

const Blog = ({
  blogs,
  handleBlogLike,
  handleDelete,
  notification,
  dispatch,
}) => {
  const [comment, setComment] = useState('')
  const id = useParams().id

  const blog = blogs.find((n) => n.id === id)

  const checkLike = () => {
    return blog.likes.includes(blog.user.id)
  }

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(blogService.updateComment, {
    onSuccess: (updateBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const filterBlogs = blogs.filter((blog) => blog.id !== updateBlog.id)

      queryClient.setQueriesData('blogs', filterBlogs.concat(updateBlog))

      setComment('')
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handleSubmit comment', comment)
    updateBlogMutation.mutate({ ...blog, comment })
  }

  return (
    <div className="blog">
      <h3 className="blog_title">blog app</h3>
      <Message message={notification.message} error={notification.error} />
      <h2 className="title">
        {blog.title} {blog.author}
      </h2>
      <div className="content">
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
        {notification.user &&
        notification.user.username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)} className="deleteBtn">
            remove
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="commentList">
        <h4>comments</h4>
        <form onSubmit={handleSubmit}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.length ? (
            blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))
          ) : (
            <div>no comments</div>
          )}
        </ul>
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  handleBlogLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
}

export default Blog
