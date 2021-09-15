import { Link } from 'react-router-dom'

function SideProfileInformation({ currentUserData }) {
  return (
    <>
      {currentUserData && (
        <div className="flex-row-start-3 remove-from-view">
          <Link to={`/profile/${currentUserData.id}/`} className="flex-row-4 mx-2 text-decoration-none font-dark">
            <img clas src={currentUserData.profileImage} alt="Profile Image" className="message-profile-image-large" />
            <strong className="my-0 py-0 px-2 text-decoration-none">{currentUserData.username}</strong>
          </Link>
          <small
            className="extra-small py-2 mx-2 grey-font-color"
          >About•Help•API•Jobs•<br />
            <Link
              className="text-decoration-none grey-font-color"
              to="/privacy"
              alt="Privacy"
            >Privacy
            </Link>•
            <Link
              className="text-decoration-none grey-font-color"
              to="/terms"
              alt="Terms">Terms
            </Link>•
            <Link
              className="text-decoration-none grey-font-color"
              to="/cookies"
              alt="Cookies"
            >Cookies
            </Link>
          </small>
          <small
            className="extra-small mx-2 grey-font-color"
          >© PAINTEREST FROM
            <a
              rel="noreferrer"
              target="_blank"
              className="text-decoration-none grey-font-color"
              href="https://github.com/hatch9191" alt="GitHub Harry"> HARRY</a> &
            <a
              rel="noreferrer"
              target="_blank"
              className="text-decoration-none grey-font-color"
              href="https://github.com/eoin-barr" alt="GitHub Eoin"> EOIN</a>
          </small>
        </div>
      )}
    </>
  )
}

export default SideProfileInformation