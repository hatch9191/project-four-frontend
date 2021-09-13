import React from 'react'
import { Navbar, Container, Nav, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import AsyncSelect from 'react-select/async'

import { filterPosts } from '../../lib/api'
import { removeToken } from '../../lib/auth'

function Navigation({ loggedIn, filteredPosts, setFilteredPosts }) {

  const history = useHistory()
  const [query, setQuery] = React.useState('')
  const styles = {
    control: styles => ({ ...styles, backgroundColor: 'whitesmoke', borderRadius: '20px' }),
  }

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
    if (filteredPosts.length < 2) {
      history.push(`/posts/${filteredPosts[0].id}/`)
    } else if (!query) {
      history.push('/posts/')
    } else {
      history.push(`/posts/search?=q${query}`)
    }
  }

  console.log(filteredPosts)

  return (
    <Navbar className="navigation" fixed="top" expand="sm">
      <Container className="nav-layout">
        <Navbar.Brand href="/" className="nav-logo">
          <img
            alt="logo"
            src="https://res.cloudinary.com/dn11uqgux/image/upload/v1631312231/sei_project_3_studio_images/icons8-modern-art-96_iiqscv.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        Painterest
        </Navbar.Brand>
        {loggedIn && (
          <>
            <Container>
              <Form onSubmit={handleSubmit}>
                <AsyncSelect
                  isMulti
                  placeholder="Search"
                  // defaultOptions={posts}
                  focusDefaultOption
                  loadOptions={loadOptions}
                  styles={styles}
                  onInputChange={(value) => setQuery(value)}
                  // onChange={(value) => setQuery(value)}
                  // ref={selectRef}
                  // onInputChange={(value) => {
                  //   selectRef.current.select.getNextFocusedOption = () => false
                  // }}
                />
              </Form>
            </Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="drop-links">
                <Nav.Link as={Link} to="#" className="navbar-links" title="Messages"><i className="far fa-comment-dots icons"></i></Nav.Link>
                <Nav.Link as={Link} to="/profile/:userId" className="navbar-links" title="Profle"><i className="fas fa-user-circle icons"></i></Nav.Link>
                <Nav.Link as={Link} to="/" className="navbar-links" title="Log Out" onClick={handleLogout}><i className="fas fa-sign-out-alt icons"></i></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  )
}

export default Navigation