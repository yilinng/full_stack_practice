import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

const UserBlog = ({ users }) => {
  const id = useParams().id
  console.log('users', users)
  const user = users.find((n) => n.id === id)
  return (
    <div className="user_blog_content">
      <h2 className="username">{user.username}</h2>

      <h3 className="addedblogs">added blogs</h3>
      <div className="blog_list">
        <ul>
          {user.blogs.map((blog, index) => (
            <li key={index}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

UserBlog.prototype = {
  users: PropTypes.array.isRequired,
}

export default UserBlog
