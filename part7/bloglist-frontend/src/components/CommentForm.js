import React, { useState } from 'react'

const CommentForm = ({ createComment }) => {
  
  const [comment, setComment] = useState('')

  const addComment = event => {
    event.preventDefault()
    createComment({ comment })
    setComment('')
  }

  return (
    <form onSubmit={ addComment }>
      <input
        id='commentInput'
        type='text'
        value={ comment }
        name='title'
        onChange={ ({ target }) => setComment(target.value) }
      />
      <button id='addComment' type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm