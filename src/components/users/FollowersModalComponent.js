import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

function FollowersModalComponent({ props, userData }) {
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

export default FollowersModalComponent