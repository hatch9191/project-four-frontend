import React from 'react'
import AsyncSelect from 'react-select/async'

import { Navbar, Container, Form, Nav } from 'react-bootstrap'
import { filterPosts } from '../../lib/api'
import { Link, useHistory } from 'react-router-dom'
import { removeToken, getPayLoad } from '../../lib/auth'
import { getAllChatsUserIsIn } from '../../lib/api'
import ChatIndexDropDown from './ChatIndexDropDown'
// import $ from 'jquery'

function Navigation({ loggedIn, posts, setFilteredPosts }) {

  const history = useHistory()
  const [query, setQuery] = React.useState({})
  const styles = {
    control: styles => ({ ...styles, backgroundColor: 'whitesmoke', borderRadius: '20px' }),
  }
  const userId = getPayLoad().sub
  const [toggleDropdown, setToggleDropdown] = React.useState(false)
  const [userChats, setUserChats] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllChatsUserIsIn(userId)
        setUserChats(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  console.log(userChats)
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

  const loadOptions = async () => {
    const res = await filterPosts(query)
    setFilteredPosts(res.data)
    return res.data
  }

  const handleSubmit = () => {
    // setQuery(query)
    // if (query) {
    // console.log('inside', query)
    history.push(`/posts/${query.id}/`)
    // window.history.replaceState(null, `/posts/${query.id}/`)
    // }
    // console.log('outside', query)
    // history.push('/posts/')
    // } else {
    //   history.push(`/posts/search?q=${query}`)
    // }
  }

  // const myRef = React.createRef()
  // constructor(props) {
  //   super(props)

  // }

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

  console.log('query', query)

  return (
    <div className="message-head" fluid>
      <Navbar className="navigation" fixed="top" expand="sm">
        <Container className="nav-layout">
          <Navbar.Brand href={!loggedIn ? '/' : '/posts/'} className="nav-logo no-bg-change">
            <img
              alt="logo"
              src="https://res.cloudinary.com/dk0r9bcxy/image/upload/v1631747952/project-4/Pinterest-logo_bj0rem.png"
              width="30"
              height="30"
              className="d-inline-block align-top "
            />
            Painterest
          </Navbar.Brand>
          {loggedIn && (
            <>
              <Container>
                <Form onSubmit={handleSubmit}>
                  <AsyncSelect
                    placeholder="Search"
                    isClearable
                    defaultOptions={posts}
                    loadOptions={loadOptions}
                    styles={styles}
                    onInputChange={(value) => setQuery(value)}
                    onChange={(value) => setQuery(value)}
                    value={query}
                  // inputValue={(value) => set-value}
                  // ref={myRef}
                  // onInputChange={(value) => {
                  //   setQuery(value)
                  //   myRef.current.select.getNextFocusedOption = () => false
                  // }}
                  />
                </Form>
              </Container>
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
  )
}

export default Navigation