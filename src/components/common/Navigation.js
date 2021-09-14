import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { removeToken, getPayLoad } from '../../lib/auth'
import { getAllChatsUserIsIn } from '../../lib/api'
import ChatIndexDropDown from './ChatIndexDropDown'
import $ from 'jquery'

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
        console.log(userChats)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // const nonparent = $('.message-icon-jq')
  // const position = nonparent.offset()

  // $('.message-popout-create').offset({
  //   top: position.top,
  //   right: position.right,
  // })

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

  // const handleChatShow = () => {
  //   setToggleDropdown(false)
  // }

  return (
    <>
      <div className="message-head" fluid>
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
                    <Nav.Link onClick={HandleDropDown} className="navbar-links message-icon-jq" title="Messages"><i className="far fa-comment-dots icons"></i></Nav.Link>
                    <Nav.Link as={Link} to={`/profile/${userId}/`} className="navbar-links" title="Profle"><i className="fas fa-user-circle icons"></i></Nav.Link>
                    <Nav.Link as={Link} to="/" className="navbar-links" title="Log Out" onClick={handleLogout}><i className="fas fa-sign-out-alt icons"></i></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}
          </Container>
        </Navbar>
        {toggleDropdown && (
          <>
            <ChatIndexDropDown setToggleDropdown={setToggleDropdown} />
          </>
        )}
      </div>
    </>
  )
}

export default Navigation