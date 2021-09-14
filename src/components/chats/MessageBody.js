import MessageDelete from './MessageDelete'

function MessageBody({ chatData, currUser, currentUserData, setChatData }) {

  const sortMessages = () => {
    const sortedArr = chatData.messages.sort((a, b) => {
      a = a.id
      b = b.id
      return b - a
    })
    return sortedArr
  }

  return (
    <>
      {chatData && (
        sortMessages().map(message => (
          <div className={message.sender.id === currUser ? 'flex-row-start-2' : 'flex-row-start'} key={message.id}>
            <div className="flex-row-end">
              <img className="message-profile-image" src={message.sender.profileImage} alt="Profile Image" />
            </div>
            <div className="message-text mx-2">
              <p className="py-0 my-0">
                <strong>
                  <>
                    {message.sender.username}
                    {message.sender.username === currentUserData.username ? <MessageDelete message={message} setChatData={setChatData} /> : ''}
                  </>
                </strong>
              </p>
              <p className="py-0 my-0 width-200">{message.content}</p>
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
    </>
  )
}

export default MessageBody