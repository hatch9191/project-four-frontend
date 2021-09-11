import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import { useLocation, useParams, Link } from 'react-router-dom'

import Error from '../extras/Error'
import Loading from '../extras/Loading'
import { followToggle, getSingleUser } from '../../lib/api'
import { getPayLoad, isOwner, isAuthenticated } from '../../lib/auth'

function ProfileShow() {
  const { userId } = useParams()
  const [userData, setUserData] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const loading = !userData && !isError
  const [owner, setOwner] = React.useState()
  const [following, setFollowing] = React.useState()
  const [canFollow, setCanFollow] = React.useState()
  const currentUser = getPayLoad().sub
  const location = useLocation()
  const [savedPosts, setSavedPosts] = React.useState(true)
  const [createdPosts, setCreatedPosts] = React.useState(false)
  const [modalShow, setModalShow] = React.useState(false)
  const [modalFollowingShow, setModalFollowingShow] = React.useState(false)



  React.useEffect(() => {
    async function getData() {
      try {
        const response = await getSingleUser(userId)
        setUserData(response.data)
        setModalShow(false)
        setModalFollowingShow(false)
      } catch (err) {
        setIsError(true)
        console.log(err)
      }
    }
    getData()
  }, [userId])

  React.useEffect(() => {
    const areYouOwner = isOwner(parseInt(userId))
    const isAuth = isAuthenticated()
    if (areYouOwner && isAuth) {
      setOwner(true)
    } else {
      setOwner(false)
    }
  }, [userId])

  React.useEffect(() => {
    setCanFollow(parseInt(userId) !== currentUser)
  }, [location, currentUser, userId])

  React.useEffect(() => {
    async function compareUser() {
      try {
        const user = await getSingleUser(currentUser)
        const currentUserData = user.data
        if (currentUserData.following.some(user => user.id === parseInt(userId))) {
          setFollowing(true)
        } else {
          setFollowing(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    compareUser()
    setCanFollow(parseInt(userId) !== currentUser)
  }, [location, currentUser, userId])


  async function handleFollow() {
    try {
      if (following) {
        await followToggle(userId)
        setFollowing(false)
      } else {
        await followToggle(userId)
        setFollowing(true)
      }
      const updateState = await getSingleUser(userId)
      setUserData(updateState.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleShowSavedPosts = () => {
    setCreatedPosts(false)
    setSavedPosts(true)
  }

  const handleShowCreatedPosts = () => {
    setSavedPosts(false)
    setCreatedPosts(true)
  }

  const FollowersModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Followers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-row-center">
          <div>
            {userData && userData.followedBy.length < 1 && (
              <div><p >{userData.username} has no followers</p></div>
            )}
            {userData && userData.followedBy.length > 0 &&
              userData.followedBy.map(follower => (
                <div key={follower.id}><Link className="normal-text" to={`/profile/${follower.id}/`}><p>{follower.username}</p></Link></div>
              ))
            }
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  const FollowingModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Following
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-row-center">
          <div>
            {userData && userData.following.length < 1 && (
              <div><p >{userData.username} is not following anyone</p></div>
            )}
            {userData && userData.following.length > 0 &&
              userData.following.map(follow => (
                <div key={follow.id}><Link className="normal-text" to={`/profile/${follow.id}/`}><p>{follow.username}</p></Link></div>
              ))
            }
          </div>
        </Modal.Body>
      </Modal>
    )
  }



  return (
    <>
      <Container fluid>
        <div>
          {loading && <Loading />}
          {isError && <Error />}
          {userData && (
            <div className="flex-col-center">
              <div className="pt-4"></div>
              {userData.profileImage && <div><img src={userData.profileImage} className="profile-image"></img></div>}
              {userData.firstName && userData.lastName && <h2 className="pt-2"><strong>{userData.firstName} {userData.lastName}</strong></h2>}
              <p className="mb-0">@{userData.username.toLowerCase()}</p>
              <a className="normal-text cursor-pointer" onClick={() => setModalFollowingShow(true)}><p className="mb-0">{userData.following.length < 1 ? '0' : userData.following.length} following</p></a>
              <a className="normal-text cursor-pointer" onClick={() => setModalShow(true)}><p className="mb-0">{userData.followedBy.length < 1 ? '0' : userData.followedBy.length} followers</p></a>
              <FollowingModal
                show={modalFollowingShow}
                onHide={() => setModalFollowingShow(false)}
              />
              <FollowersModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              {isAuthenticated() &&
                <div>
                  {canFollow ?
                    <>
                      {!following ? (
                        <>
                          <i onClick={handleFollow} className="fas fa-user-plus pop-out p-2 mx-1"></i>
                          <i className="fas fa-comments pop-out p-2 mx-1"></i>
                        </>
                      ) : (
                        <>
                          <i onClick={handleFollow} className="fas fa-user-times pop-out p-2 mx-1"></i>
                          <i className="fas fa-comments pop-out p-2 mx-1"></i>
                        </>
                      )}
                    </>
                    :
                    <>
                      {owner && <i className="fas fa-pen pop-out p-2 mx-1"></i>}
                      {owner && <i className="fas fa-inbox pop-out p-2 mx-1"></i>}
                    </>
                  }
                </div>
              }
            </div>
          )}
        </div>
      </Container>
      <Container className="w-75 bt-1 mt-4">
        <div className="flex-row-center">
          <a onClick={handleShowSavedPosts}><p className={`cursor-pointer px-3 pt-1 ${savedPosts ? 'bordertop' : ''}`}>Posts Saved</p></a>
          <a onClick={handleShowCreatedPosts}><p className={`cursor-pointer px-3 pt-1 ${createdPosts ? 'bordertop' : ''}`}>Posts Added</p></a>
        </div>
        <div>
          {userData && !createdPosts && userData.savedPosts.length < 1 && (
            <div><p className="mt-2">{userData.username} has not saved any posts</p></div>
          )}
          {userData && savedPosts &&
            userData.savedPosts.map(post => (
              <div key={post.id}><p>{post.title}</p></div>
            ))
          }
          {userData && !savedPosts && userData.createdPosts.length < 1 && (
            <div><p className="mt-2">{userData.username} has not created any posts</p></div>
          )}
          {userData && createdPosts &&
            userData.createdPosts.map(post => (
              <div key={post.id}><p>{post.title}</p></div>
            ))
          }
        </div>
      </Container>

    </>
  )
}

export default ProfileShow