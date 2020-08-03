import React from 'react'

const User = ({ user }) => {
  return (
    <>
      {
        user &&
        (
          <div>
            <h2>{ user.name }</h2>
            <h3><b>{ user.blogs.length > 0 ? 'added blogs' : 'no blogs' }</b></h3>
            <ul>
              {
                user.blogs.map(b => <li key={ b.id }>{ b.title }</li>)
              }
            </ul>
          </div>
        )
      }
    </>
  )
}

export default User