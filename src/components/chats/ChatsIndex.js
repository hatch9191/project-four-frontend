import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAllChatsUserIsIn } from '../../lib/api'


function ChatsIndex() {
  const { userId } = useParams()
  const [userData, setUserData] = React.useState(null)


  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllChatsUserIsIn(userId)
        setUserData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])



  return (
    <>
      {userData && console.log(userData)}
      <h1 className="mt-4 pt-4">Chat Index</h1>
      {userData && (
        userData.map(chat => (
          (chat.userA.id === parseInt(userId) ?
            <div key={chat.userB.id}>
              <Link to={`/profile/${userId}/chats/${chat.id}`}><p>{chat.userB.username}</p></Link>
            </div>
            :
            <div key={chat.userA.id}>
              <Link to={`/profile/${userId}/chats/${chat.id}`}><p>{chat.userA.username}</p></Link>
            </div>
          )
        ))
      )}
    </>
  )
}

export default ChatsIndex