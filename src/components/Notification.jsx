import React from 'react'

// const Notification = ({ message, type }) => {
//   if (!message ) {
//     return null
//   }

//   return (
//     <div className={type}>
//       {message}
//     </div>
//   )
// }
// export default Notification
export const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

// helper to render success message
// the style can be found from index.css
export const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}
