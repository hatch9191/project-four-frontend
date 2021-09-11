import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { removeToken } from '../../lib/auth'

function Navigation({ loggedIn }) {

  const history = useHistory()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <Navbar className="navigation" fixed="top" expand="sm">
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