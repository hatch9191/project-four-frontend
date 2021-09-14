import React from 'react'
import { Form } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { createMessage, getSingleChat, getSingleUser } from '../../lib/api'
import { getPayLoad } from '../../lib/auth'

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
  }, [])


  const sortMessages = () => {
    const sortedArr = chatData.messages.sort((a, b) => {
      a = a.id
      b = b.id
      return b - a
    })
    return sortedArr
  }

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
              {chatData && (
                sortMessages().map(message => (
                  <div className={message.sender.id === currUser ? 'flex-row-start-2' : 'flex-row-start'} key={message.id}>
                    <div className="flex-row-end">
                      <img className="message-profile-image" src={message.sender.profileImage} alt="Profile Image" />
                    </div>
                    <div className="message-text mx-2">
                      <p className="py-0 my-0"><strong>{message.sender.username}</strong></p>
                      <p className="py-0 my-0 width-200">{message.content}</p>
                      {console.log('message', message)}
                      <small className="py-0 my-0 smaller">
                        {message.createdAt[11]}
                        {message.createdAt[12]}
                        {message.createdAt[13]}
                        {message.createdAt[14]}
                        {message.createdAt[15]}
                      </small>
                    </div>
                    <div>
                    </div>
                  </div>
                ))
              )}
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
                {/* <Button variant="info" type="submit">Send</Button> */}
              </Form>
            </div>
          </div>
          {currentUserData && (
            <div className="flex-row-start-3 remove-from-view">
              <div className="flex-row-4 mx-2">
                <img clas src={currentUserData.profileImage} alt="Profile Image" className="message-profile-image-large" />
                <strong className="my-0 py-0 px-2">{currentUserData.username}</strong>
              </div>
              <small
                className="extra-small py-2 mx-2 grey-font-color"
              >About•Help•API•Jobs•<br />
                <Link className="text-decoration-none grey-font-color" to="/privacy" alt="Privacy">Privacy</Link>•
                <Link className="text-decoration-none grey-font-color" to="/terms" alt="Terms">Terms</Link>•
                <Link className="text-decoration-none grey-font-color" to="/cookies" alt="Cookies">Cookies</Link></small>
              <small
                className="extra-small mx-2 grey-font-color"
              >© PAINTEREST FROM
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="text-decoration-none grey-font-color"
                  href="https://github.com/hatch9191" alt="GitHub Harry"> HARRY</a> &
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="text-decoration-none grey-font-color"
                  href="https://github.com/eoin-barr" alt="GitHub Eoin"> EOIN</a>
              </small>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ChatShow