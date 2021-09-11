import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'


function FollowingModalComponent({ props, userData }) {
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

export default FollowingModalComponent