import React from 'react'
import { Form } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { createMessage, getSingleChat, getSingleUser } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'
// import MessageDelete from './MessageDelete'
import SideProfileInformation from './SideProfileInformation'
import MessageBody from './MessageBody'

function ChatShow() {
  const initialState = {
    content: '',
  }

  const { userId, chatId } = useParams()
  const [chatData, setChatData] = React.useState(null)
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [currentUserData, setCurrentUserData] = React.useState(null)
  const currUser = getPayLoad().sub

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleChat(userId, chatId)
        setChatData(res.data)
        setFormData({
          content: chatData.content,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId, chatId])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleUser(currUser)
        setCurrentUserData(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [currUser])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    try {
      await createMessage(userId, chatId, formData)
      setFormData(initialState)
    } catch (err) {
      console.log(err)
    }
    const updatedChat = await getSingleChat(userId, chatId)
    setChatData(updatedChat.data)
  }


  return (
    <>

      {chatData && currentUserData && (

        <div fluid className="flex-center-3 my-4 py-4">
          <div className="width-set">
            <div className="flex-row-start py-2 has-absolute-position">
              {parseInt(currentUserData.id) === parseInt(chatData.userA.id) ?
                <>
                  <img className="message-profile-image mx-2" src={chatData.userB.profileImage} alt="Profile Image" />
                  <Link to={`/profile/${chatData.userB.id}`} className="flex-col-around text-decoration-none">
                    <h6 className="mb-0 no-text-decoration b-1 b-2 text-decoration-none"><strong>{chatData.userB.username}</strong></h6>
                    <p className="mb-0 no-text-decoration b-1 b-2 text-decoration-none"><small>Active yesterday</small></p>
                  </Link>
                </>
                :
                <>
                  <img className="message-profile-image mx-2" src={chatData.userA.profileImage} alt="Profile Image" />
                  <Link to={`/profile/${chatData.userA.id}`} className="flex-col-around text-decoration-none">
                    <h6 className="mb-0 no-text-decoration b-1 b-2 text-decoration-none"><strong>{chatData.userA.username}</strong></h6>
                    <p className="mb-0 no-text-decoration b-1 b-2 text-decoration-none"><small>Active yesterday</small></p>
                  </Link>
                </>
              }
            </div>
            <div className="message-col">
              <MessageBody
                chatData={chatData}
                currUser={currUser}
                currentUserData={currentUserData}
                setChatData={setChatData}
              />
            </div>
            <div className="flex-row-full" >
              <img className="message-profile-image ml-2-img" src={currentUserData.profileImage} alt="Profile Image" />
              <Form className="display-inline-block mx-2" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Send a message"
                    name="content"
                    onChange={handleChange}
                    value={formData.content}
                    rows={3}
                    className="border-rounded"
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
          <SideProfileInformation currentUserData={currentUserData} />
        </div>
      )}
    </>
  )
}

export default ChatShow