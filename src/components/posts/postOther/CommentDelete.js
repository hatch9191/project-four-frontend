import { getSinglePost } from '../../../lib/api'

import { deleteComment } from '../../../lib/api'

function CommentDelete({ postId, comment, setPost, setIsError }) {
  
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
    <i className="fas fa-trash-alt delete-bin" title="Delete comment" onClick={handleDelete}></i>
  )
}

export default CommentDelete