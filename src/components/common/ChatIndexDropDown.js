import React from 'react'
import { Link } from 'react-router-dom'
import { getPayLoad } from '../../lib/auth'
import { getAllChatsUserIsIn } from '../../lib/api'
import onClickOutside from 'react-onclickoutside'
import Loading from '../extras/Loading'

function ChatIndexDropDown({ setToggleDropdown }) {

  const userId = getPayLoad().sub
  const [userChats, setUserChats] = React.useState(null)

  // const [test, setTest] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userId = await getPayLoad().sub
        const res = await getAllChatsUserIsIn(userId)
        setUserChats(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const filterByMostRecent = () => {
    const filterChats = userChats.filter(chat => {
      if (chat.messages.length > 0) {
        return chat
      }
    })
    return filterChats.sort((a, b) => {
      a = a.messages.sort((c, d) => {
        c = c.id
        d = d.id
        return d - c
      })[0].id
      b = b.messages.sort((e, f) => {
        e = e.id
        f = f.id
        return f - e
      })[0].id
      return b - a
    })
  }

  ChatIndexDropDown.handleClickOutside = () => setToggleDropdown(false)
  return (
    <div fixed className="message-popout-create">
      <p className="show-off-message mx-2">Messages</p>
      <hr />
      <div className="scroll-overflow">
        {!userChats && <Loading />}
        {userChats && console.log('filterByMostChats', filterByMostRecent())}
        {userChats && userChats.length < 1 && <div className="flex-div-center"><p className="my-4">No Chats</p></div>}
        {userChats && (
          filterByMostRecent().map(chat => (
            chat.messages.length > 0 &&
            (chat.userA.id === parseInt(userId) ?
              <>
                <Link onClick={() => setToggleDropdown(false)} to={`/profile/${userId}/chats/${chat.id}`} className="flex-row-col-2 no-decoration hover-color" key={chat.userB.id}>
                  <div className="flex-center">
                    <img className="chat-profile-image mx-2" src={chat.userB.profileImage} />
                  </div>
                  <div className="flex-col-start mx-1 w-100">
                    <div className="w-100">
                      <p
                        className="no-decoration b-1 mb-0 mt-2"
                        onClick={() => setToggleDropdown(false)}
                      >
                        <strong>{chat.userB.username}</strong>
                        <span className="float-right-2">
                          {chat.messages.sort((a, b) => {
                            a = a.id
                            b = b.id
                            return b - a
                          })[0].createdAt.substr(11, 5)
                          }
                        </span>
                      </p>
                      {/* <p className="chat-line-elements no-decoration b-1 b-1 mb-0 mt-2"><strong>{chat.userB.username}</strong></p> */}
                    </div>
                    <div className="w-100">

                      <p style={{ textDecoration: 'none' }} className="no-decoration b-1">
                        {chat.messages.sort((a, b) => {
                          a = a.id
                          b = b.id
                          return b - a
                        })[0].sender.username
                        }:&nbsp;
                        {chat.messages.sort((a, b) => {
                          a = a.id
                          b = b.id
                          return b - a
                        })[0].content.substr(0, 15)
                        }






                        <span className={
                          (chat.messages.sort((a, b) => {
                            a = a.id
                            b = b.id
                            return b - a
                          })[0].sender.id !== parseInt(userId))
                            &&
                            (chat.messages.sort((a, b) => {
                              a = a.id
                              b = b.id
                              return b - a
                            })[0].isRead === false)
                            ?
                            'float-right-2 green-notification'
                            :
                            'no-new-messages'
                        }></span>





                      </p>
                    </div>
                  </div>
                </Link>
                <hr />
              </>
              :
              <>
                <Link onClick={() => setToggleDropdown(false)} to={`/profile/${userId}/chats/${chat.id}`} className="flex-row-col-2 no-decoration hover-color" key={chat.userA.id}>
                  <div className="flex-center">
                    <img className="chat-profile-image mx-2" src={chat.userA.profileImage} />
                  </div>
                  <div className="flex-col-start mx-1 w-100">
                    <div className="w-100">
                      <p
                        className="no-decoration b-1 mb-0 mt-2"
                        onClick={() => setToggleDropdown(false)}
                      >
                        <strong>{chat.userA.username}</strong>
                        <span className="float-right-2">
                          {chat.messages.sort((a, b) => {
                            a = a.id
                            b = b.id
                            return b - a
                          })[0].createdAt.substr(11, 5)
                          }
                        </span>
                      </p>
                    </div>
                    <div className="w-100">
                      <p className="no-decoration b-1">
                        {chat.messages.sort((a, b) => {
                          a = a.id
                          b = b.id
                          return b - a
                        })[0].sender.username
                        }:&nbsp;
                        {chat.messages.sort((a, b) => {
                          a = a.id
                          b = b.id
                          return b - a
                        })[0].content.substr(0, 18)
                        }



                        <span className={
                          (chat.messages.sort((a, b) => {
                            a = a.id
                            b = b.id
                            return b - a
                          })[0].sender.id !== parseInt(userId))
                            &&
                            (chat.messages.sort((a, b) => {
                              a = a.id
                              b = b.id
                              return b - a
                            })[0].isRead === false)
                            ?
                            'float-right-2 green-notification'
                            :
                            'no-new-messages'
                        }></span>





                      </p>
                    </div>

                  </div>
                </Link>
                <hr />
              </>
            )
          ))
        )}
      </div>
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => ChatIndexDropDown.handleClickOutside,
}

export default onClickOutside(ChatIndexDropDown, clickOutsideConfig)