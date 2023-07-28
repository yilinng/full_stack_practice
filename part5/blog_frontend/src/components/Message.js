import PropTypes from 'prop-types'

const Message = ({ message, error }) => {
  return (
    <div>
      {message ? (
        <h3 className="message"> {message} </h3>
      ) : error ? (
        <h3 className="error"> {error} </h3>
      ) : (
        <h3 className="no_message"></h3>
      )}
    </div>
  )
}

Message.prototype = {
  message: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}

export default Message
