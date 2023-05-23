import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../index.css'

const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>Users</h2>

      <table className="user_table">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Users.prototype = {
  users: PropTypes.array.isRequired,
}
export default Users
