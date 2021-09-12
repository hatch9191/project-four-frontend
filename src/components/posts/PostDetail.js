import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router'

import { getSinglePost, getSingleUser, savePost, followToggle } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
import Error from '../extras/Error'
import Loading from '../extras/Loading'

function PostDetail() {

  const { postId } = useParams()
  const user = getPayLoad()
  const [userData, setUserData] = React.useState(null)
  const [post, setPost] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !post && !isError

  React.useEffect(() => {
    const getPostData = async () => {
      try {
        const userRes = await getSingleUser(user.sub)
        setUserData(userRes.data)
        console.log('USER', userRes.data)
        const postRes = await getSinglePost(postId)
        setPost(postRes.data)
        console.log('POST', postRes.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getPostData()
  }, [postId, user.sub])

  const handleSave = async () => {
    try {
      const res = await savePost(postId)
      console.log(res)
      const studioResponse = await getSinglePost(postId)
      setPost(studioResponse.data)
      const profileResponse = await getSingleUser(user.sub)
      setUserData(profileResponse.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleFollow = async () => {
    try {
      const res = await followToggle(post.owner.id)
      console.log(res)
      const studioResponse = await getSinglePost(postId)
      setPost(studioResponse.data)
      const profileResponse = await getSingleUser(user.sub)
      setUserData(profileResponse.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  return (
    <Container className="detail-page">
      {isError && <div className="px-4 py-5 text-center"><Error /></div>}
      {isLoading && <div className="px-4 py-5 text-center"><Loading /></div>}
      {post && (
        <div className="detail-card">
          <div className="detail-image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="detail-text">
            <div className="top-line">
              {userData.savedPosts.some(saved => saved.id === Number(postId)) && (
                <Button variant="dark" className="save-button" onClick={handleSave}>Saved</Button>
              )}
              {!userData.savedPosts.some(saved => saved.id === Number(postId)) && (
                <Button variant="danger" className="save-button" onClick={handleSave}>Save</Button>
              )}
            </div>
            <div className="post-info">
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
            <div className="owner-follow">
              <div className="owner-info">
                <img src={post.owner.profileImage} />
                <p>{post.owner.username}</p>
              </div>
              {!userData.following.some(user => user.id === post.owner.id) && (
                <Button className="follow-button" onClick={handleFollow}>Follow</Button>
              )}
              {userData.following.some(user => user.id === post.owner.id) && (
                <Button variant="dark" className="following-button" onClick={handleFollow}>Following</Button>
              )}
            </div>
            <hr />
            <div className="comments-area">
              <h4>Comments</h4>
              
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default PostDetail
