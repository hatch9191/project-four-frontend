import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { createMessage, getSingleChat } from '../../lib/api'

function ChatShow() {
  const initialState = {
    content: '',
  }


  const { userId, chatId } = useParams()
  const [chatData, setChatData] = React.useState(null)
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)






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

  const sortMessages = () => {
    const sortedArr = chatData.messages.sort((a, b) => {
      a = a.id
      b = b.id
      return a - b
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
      {/* {chatData && console.log(chatData)} */}
      <h1 className="pt-4 mt-4">Chat Show Page (messages)</h1>
      {chatData && (
        sortMessages().map(message => (
          <div key={message.id}>
            <p><strong>{message.sender.username}: </strong>{message.content}</p>
          </div>
        ))
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            name="content"
            onChange={handleChange}
            placeholder="Send a message"
            as="textarea"
            value={formData.content}
            rows={3}
          />
        </Form.Group>
        <Button variant="info" type="submit">Send</Button>
      </Form>
    </>
  )
}

export default ChatShow