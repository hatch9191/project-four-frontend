import React from 'react'

import { getSinglePost } from '../../../lib/api'
import { deleteComment } from '../../../lib/api'

function CommentDelete({ postId, comment, setPost, setIsError }) {
  
  const [toggleDelete, setToggleDelete] = React.useState(false)

  const preDelete = () => {
    if (!toggleDelete) {
      setToggleDelete(true)
    } else {
      setToggleDelete(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteComment(postId, comment.id)
      console.log(res)
      const studioResponse = await getSinglePost(postId)
      setPost(studioResponse.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }
  
  return (
    <div className="bin-buttons">
      {/* {!toggleDelete && ( */}
      
      {/* )} */}
      {toggleDelete && (
        <i className="fas fa-trash-alt delete-bin delete-colour" title="Delete comment" onClick={handleDelete}></i>
      )}
      <span onClick={preDelete} className="delete-bin options" title="Options">⋮</span>
    </div>
  )
}

export default CommentDelete