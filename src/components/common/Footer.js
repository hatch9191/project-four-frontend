import React from 'react'
import { Link } from 'react-router-dom'

function Footer({ loggedIn }) {

  const [postOpen, setPostOpen] = React.useState(false)
  const [termsOpen, setTermsOpen] = React.useState(false)

  const openPostPopout = () => {
    if (!postOpen) {
      setPostOpen(true)
      setTermsOpen(false)
    } else {
      setPostOpen(false)
      setTermsOpen(false)
    }
    
  }

  const openTermsPopout = () => {
    if (!termsOpen) {
      setTermsOpen(true)
      setPostOpen(false)
    } else {
      setTermsOpen(false)
      setPostOpen(false)
    }
  }

  return (
    <div className="footer">
      {postOpen && (
        <div className="footer-popout-create">
          <p className="show-off">Show Off Your Art To Others</p>
          <hr />
          <div>
            <p className="create"><span>+</span> Create a Post</p>
          </div>
        </div>
      )}
      {termsOpen && (
        <div className="footer-popout-terms">
          <Link className="terms-links" to="/contact">Contact Us</Link>
          <Link className="terms-links" to="/terms">Terms</Link>
          <Link className="terms-links" to="/cookies">Cookies</Link>
          <Link className="terms-links" to="/privacy">Privacy</Link>
        </div>
      )}
      {loggedIn && (
        <div className="footer-circle" onClick={openPostPopout}>
          <h1>+</h1>
        </div>
      )}
      <div className="footer-circle" onClick={openTermsPopout}>
        <h2>?</h2>
      </div>
    </div>
  )
}

export default Footer
