import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleCreate, createBlogSuccess }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (createBlogSuccess) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }, [createBlogSuccess])

  return (
    <div className="create_blog">
      <h2>Create new</h2>
      <form onSubmit={(event) => handleCreate(event, title, author, url)}>
        <div className="form-title">
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-author">
          <label htmlFor="author">author: </label>
          <input
            type="text"
            name="author"
            id="author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-url">
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            id="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-button">
          <input type="submit" value="create" className="create_Btn" />
        </div>
      </form>
    </div>
  )
}

CreateBlog.prototype = {
  handleCreate: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  createBlogSuccess: PropTypes.bool.isRequired,
}

export default CreateBlog
