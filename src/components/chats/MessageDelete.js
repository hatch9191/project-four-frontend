import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleChat, deleteMessage } from '../../lib/api'

function MessageDelete({ message, setChatData }) {
  const { userId, chatId } = useParams()
  const [toggleDelete, setToggleDelete] = React.useState(false)

  const handleDelete = async e => {
    e.preventDefault()
    try {
      await deleteMessage(userId, chatId, message.id)
      const res = await getSingleChat(userId, chatId)
      setChatData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const preDelete = () => {
    if (!toggleDelete) {
      setToggleDelete(true)
    } else {
      setToggleDelete(false)
    }
  }

  return (
    <span className="">
      <span onClick={preDelete} className="smaller rel notParent">⋮</span>
      {toggleDelete && (
        <span
          onClick={handleDelete}
          className="smaller rel childOne">
          <i className="fas fa-trash-alt"></i>
        </span>
      )}
    </span>
  )
}

export default MessageDelete