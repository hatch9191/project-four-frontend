import React from 'react'
import { useParams } from 'react-router'

import { getSinglePost } from '../../lib/api'
import Error from '../extras/Error'
import Loading from '../extras/Loading'

function PostDetail() {

  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !post && !isError

  React.useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await getSinglePost(postId)
        setPost(res.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getPostData()
  }, [postId])

  console.log(post.title)

  return (
    <>
      {isError && <div className="px-4 py-5 text-center"><Error /></div>}
      {isLoading && <div className="px-4 py-5 text-center"><Loading /></div>}
      {!post && (
        <h1>Post Detail</h1>
      )}
      {post && (
        <h1 className="pt-4 mt-4">{post.title}</h1>
      )}
    </>
  )
}

export default PostDetail