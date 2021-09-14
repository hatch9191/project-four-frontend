import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { getSinglePost, getSingleUser, savePost, followToggle } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
import CommentForm from '../comments/CommentForm'
import CommentDelete from './postOther/CommentDelete'
import Error from '../extras/Error'
import Loading from '../extras/Loading'
import StandardPostCard from './StandardPostCard'

function PostDetail({ posts }) {

  const { postId } = useParams()
  const user = getPayLoad().sub
  const [userData, setUserData] = React.useState(null)
  const [post, setPost] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !post && !isError

  React.useEffect(() => {
    const getPostData = async () => {
      try {
        const userRes = await getSingleUser(user)
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
  }, [postId, user])

  const handleSave = async () => {
    try {
      const res = await savePost(postId)
      console.log(res)
      const studioResponse = await getSinglePost(postId)
      setPost(studioResponse.data)
      const profileResponse = await getSingleUser(user)
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
      const profileResponse = await getSingleUser(user)
      setUserData(profileResponse.data)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }



  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000)
  
    var interval = seconds / 31536000
  
    if (interval > 1) {
      return Math.floor(interval) + ' years'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' days'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
  }
  var aDay = 24 * 60 * 60 * 1000
  // console.log(timeSince(new Date(Date.now() - aDay)))

  return (
    <>
      <Container className="detail-page">
        {isError && <div className="px-4 py-5 text-center"><Error /></div>}
        {isLoading && <div className="px-4 py-5 text-center"><Loading /></div>}
        {post && (
          <div className="detail-card">
            <div className="detail-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="text-right">
              <div className="detail-text">
                <div className="top-line">
                  {(post.owner.id !== user) && userData.savedPosts.some(saved => saved.id === Number(postId)) && (
                    <Button variant="dark" className="save-button" onClick={handleSave}>Saved</Button>
                  )}
                  {(post.owner.id !== user) && !userData.savedPosts.some(saved => saved.id === Number(postId)) && (
                    <Button variant="danger" className="save-button" onClick={handleSave}>Save</Button>
                  )}
                  {post.owner.id === user && (
                    <Button as={Link} to={`/posts/${postId}/edit/`} variant="danger" className="save-button edit">Edit Post</Button>
                  )}
                </div>
                <div className="post-info">
                  <h1>{post.title}</h1>
                  <p>{post.description}</p>
                </div>
                <div className="owner-follow">
                  <div className="owner-info">
                    <img className="user-images" src={post.owner.profileImage} />
                    <div>
                      <p>posted by <Link className="owner-link" to={`/profile/${post.owner.id}/`}>{post.owner.username}</Link></p>
                      <p>{post.owner.followedBy.length ? post.owner.followedBy.length : 'No'} {post.owner.followedBy.length === 1 ? 'follower' : 'followers'}</p>
                    </div>
                  </div>
                  {(post.owner.id !== user) && !userData.following.some(user => user.id === post.owner.id) && (
                    <Button className="follow-button" onClick={handleFollow}>Follow</Button>
                  )}
                  {(post.owner.id !== user) && userData.following.some(user => user.id === post.owner.id) && (
                    <Button variant="dark" className="following-button" onClick={handleFollow}>Following</Button>
                  )}
                  {post.owner.id === user && (
                    <Button className="follow-button" as={Link} to={`/profile/${user}/`}>Profile</Button>
                  )}
                </div>
                <hr />
                
                <div className="comments-area">
                  <h4>Comments</h4>
                  <div className="comments-map">
                    {post.comments.map(comment => (
                      <div className="comment-show" key={comment.id}>
                        <img className="user-images" src={comment.owner.profileImage} />
                        <div className="comment-text">
                          <div>
                            <p><Link className="owner-link" to={`/profile/${comment.owner.id}/`}>{comment.owner.username}</Link> <span className="time-ago">{timeSince(new Date(Date.now() - aDay))} ago</span></p>
                            <p>{comment.text}</p>
                          </div>
                          {comment.owner.id === user && (
                            <CommentDelete 
                              postId={postId} 
                              comment={comment} 
                              setPost={setPost} 
                              setIsError={setIsError} 
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <CommentForm setPost={setPost} userData={userData} />
                </div>
              </div>
              {/* <CommentForm setPost={setPost} userData={userData} /> */}
            </div>
          </div>
        )}
      </Container>
      <Container className="related-posts">
        <h4>More Like This</h4>
      </Container>
      <Container className="posts-body related" >
        {posts && posts.map(post => <StandardPostCard post={post} key={post.id} />)}
      </Container>
    </>
  )
}

export default PostDetail
