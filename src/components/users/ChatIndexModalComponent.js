import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
// import { getAllChatsUserIsIn } from '../../lib/api'

function ChatIndexModalComponent({ props, userData, userChats }) {
  // const [userChats, setUserChats] = React.useState(null)

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const res = await getAllChatsUserIsIn(userData.id)
  //       setUserChats(res.data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [userData])


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chat Index
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex-row-center">
        <div className="flex-col-center">
          {userChats && (
            userChats.map(chat => (
              (chat.userA.id === parseInt(userData.id) ?
                <div key={chat.userB.id}>
                  <Link to={`/profile/${userData.id}/chats/${chat.id}/`}><p>{chat.userB.username}</p></Link>
                </div>
                :
                <div key={chat.userA.id}>
                  <Link to={`/profile/${userData.id}/chats/${chat.id}/`}><p>{chat.userA.username}</p></Link>
                </div>
              )
            ))
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ChatIndexModalComponent