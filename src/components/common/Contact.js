import { Container } from 'react-bootstrap'

function Contact() {
  return (
    <div className="terms footer-link-pages">
      <Container fluid className="no-pad contact-us-img parallax">
        <div className="py-4"></div>
        <div className="pt-4"></div>
        <div className="pt-4"></div>
        <div className="pt-4"></div>
        < div className="px-4 py-5 text-center" >
          <h1 className="display-5 fs-1">Contact Painterest</h1>
        </div >
      </Container >
      <div className="py-4"></div>
      <div className="px-4 py-2">
        <div className="container-sm py-4">
          <h2 className="fs-2">Contact Us</h2>
          <h4 className="fs-4">Last updated August 24, 2021</h4>
          <hr />
          <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: </p>
          <p><strong>Post</strong></p>
          <ul>
            <li>Painterest Ltd</li>
            <li>The Relay Building 1st Floor</li>
            <li>114 Whitechapel High Street</li>
            <li>London E1 7PT</li>
            <li>England</li>
          </ul>   
          <p><strong>Email</strong></p>
          <ul>
            <li>admin@Painterest.co.uk</li>
          </ul>
          <p><strong>Phone</strong></p>
          <ul>
            <li>+44 (0) 207 232 0009</li>
          </ul>
        </div>
      </div>
      <div className="py-4"></div>
    </div>        
  )
}

export default Contact