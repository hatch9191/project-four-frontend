import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleChat } from '../../lib/api'

function ChatShow() {
  const { userId, chatId } = useParams()
  const [chatData, setChatData] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleChat(userId, chatId)
        setChatData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId, chatId])

  const sortMessages = () => {
    return chatData.messages.map(message => typeof message.createdAt)
    // return chatData.messages.sort((a, b) => {
    //   a = parseInt(String(a.createdAt.replaceAll(/[-:]/g, '')))
    //   b = parseInt(String(a.createdAt.replaceAll(/[-:]/g, '')))
    //   return a - b
    // })
  }


  return (
    <>
      {chatData && console.log(chatData)}
      <h1 className="pt-4 mt-4">Chat Show Page (messages)</h1>
      {chatData && console.log(sortMessages())}
      {/* {chatData && (
        chatData.messages.sort((a,b) => {
          a = parseInt(a.createdAt.replaceAll(/['-:']/g, ''))
          b = parseInt(a.createdAt.replaceAll(/['-:']/g, ''))
          return a - b
        })
      )} */}
    </>
  )
}

export default ChatShow