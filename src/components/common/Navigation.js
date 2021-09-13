import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { removeToken, getPayLoad } from '../../lib/auth'
import { getAllChatsUserIsIn } from '../../lib/api'

function Navigation({ loggedIn, posts }) {

  const history = useHistory()
  const userId = getPayLoad().sub
  const [toggleDropdown, setToggleDropdown] = React.useState(false)
  const [userChats, setUserChats] = React.useState(null)

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


  const handleLogout = () => {
    removeToken()
    history.push('/')
  }
  console.log(posts)

  const HandleDropDown = () => {
    if (!toggleDropdown) {
      setToggleDropdown(true)
    } else {
      setToggleDropdown(false)
    }
  }

  const handleChatShow = () => {
    setToggleDropdown(false)
  }

  return (
    <>
      <div className="message-head">
        <Navbar className="navigation " fixed="top" expand="sm">
          <Container className="nav-layout">
            <Navbar.Brand href="/" className="nav-logo">
              <img
                alt=""
                src="https://res.cloudinary.com/dn11uqgux/image/upload/v1631312231/sei_project_3_studio_images/icons8-modern-art-96_iiqscv.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Painterest
            </Navbar.Brand>
            {loggedIn && (
              <>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="  Search"
                    className="mr-2 search"
                    aria-label="Search"
                  />
                </Form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                  <Nav className="drop-links">
                    <Nav.Link onClick={HandleDropDown} className="navbar-links" title="Messages"><i className="far fa-comment-dots icons"></i></Nav.Link>
                    <Nav.Link as={Link} to={`/profile/${userId}/`} className="navbar-links" title="Profle"><i className="fas fa-user-circle icons"></i></Nav.Link>
                    <Nav.Link as={Link} to="/" className="navbar-links" title="Log Out" onClick={handleLogout}><i className="fas fa-sign-out-alt icons"></i></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
          </Container>
        </Navbar>
        {toggleDropdown && (
          <div fixed className="message-popout-create">
            <p className="show-off-message mx-2">Messages</p>
            <hr />
            <div>
              {userChats && (
                userChats.map(chat => (

                  chat.messages.length > 0 &&
                  (chat.userA.id === parseInt(userId) ?
                    <>
                      <Link onClick={handleChatShow} to={`/profile/${userId}/chats/${chat.id}`} className="flex-row-col-2 no-decoration hover-color" key={chat.userB.id}>
                        <div className="flex-center">
                          <img className="chat-profile-image mx-2" src={chat.userB.profileImage} />
                        </div>
                        <div className="flex-col-start mx-1">
                          <p className="chat-line-elements no-decoration b-1 b-1 mb-0 mt-2"><strong>{chat.userB.username}</strong></p>
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
                            }</p>
                        </div>
                      </Link>
                      <hr />
                    </>
                    :
                    <>
                      <Link onClick={handleChatShow} to={`/profile/${userId}/chats/${chat.id}`} className="flex-row-col-2 no-decoration hover-color" key={chat.userA.id}>
                        <div className="flex-center">
                          <img className="chat-profile-image mx-2" src={chat.userA.profileImage} />
                        </div>
                        <div className="flex-col-start mx-1">
                          <p className="chat-line-elements no-decoration b-1 mb-0 mt-2" onClick={handleChatShow} ><strong>{chat.userA.username}</strong></p>
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
                            })[0].content.substr(0, 15)
                            }</p>
                        </div>
                      </Link>
                      <hr />
                    </>
                  )
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navigation