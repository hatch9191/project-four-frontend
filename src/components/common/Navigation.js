import { Navbar, Container, Form, FormControl, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navigation() {

  return (
    <Navbar className="navigation" fixed="top">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="  Search"
                className="mr-2 search"
                aria-label="Search"
              />
            </Form>
          
            <Nav.Link as={Link} to="#" className="navbar-links"><img className="message-icon" src="https://res.cloudinary.com/dn11uqgux/image/upload/v1631313672/sei_project_3_studio_images/message-2-48_cf3868.png" title="Messages" /></Nav.Link>
            <Nav.Link as={Link} to="#" className="navbar-links"><img className="profile-icon" src="https://res.cloudinary.com/dn11uqgux/image/upload/v1631345325/sei_project_3_studio_images/profile-icon-png-898-300x300_kmecaa.png" title="Profile" /></Nav.Link>
            <Nav.Link as={Link} to="#" className="navbar-links"><img className="profile-icon" src="https://res.cloudinary.com/dn11uqgux/image/upload/v1631346901/sei_project_3_studio_images/logout-48_uqyzck.png" title="Log Out" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation