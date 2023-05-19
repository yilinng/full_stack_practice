import React from 'react'

export default function Message({ message, error }) {
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
