import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

const UserBlog = ({ users }) => {
  const id = useParams().id
  console.log('users', users)
  const user = users.find((n) => n.id === id)
  return (
    <div>
      <h2>{user.username}</h2>

      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

UserBlog.prototype = {
  users: PropTypes.array.isRequired,
}

export default UserBlog
