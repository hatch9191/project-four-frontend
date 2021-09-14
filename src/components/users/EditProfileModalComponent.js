import React from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Form, Button } from 'react-bootstrap'
import { editUser, getSingleUser } from '../../lib/api'
import ProfileImageUpload from './ProfileImageUpload'


function EditProfileModalComponent({ props, userData, setModalEditShow, setUserData }) {

  const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  }

  const { userId } = useParams()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  React.useEffect(() => {
    try {
      setFormData({
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        profileImage: userData.profileImage,
      })
    } catch (err) {
      console.log(err)
    }
  }, [userData])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    try {
      await editUser(userData.id, formData)
      setModalEditShow(false)
    } catch (err) {
      console.log(err)
    }
    const res = await getSingleUser(userId)
    setUserData(res.data)
  }

  const handleImageUpload = (imageUrl, name) => {
    setFormData({ ...formData, [name]: imageUrl })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-dialog"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex-row-center ">
        <Form className="scroll-height-edit" onSubmit={handleSubmit}>

          <Form.Group>
            <ProfileImageUpload
              labelText="Profile Image"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleImageUpload}
            />
          </Form.Group>





          <Form.Group className="mt-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <Form.Text className="text-muted">{formErrors.username}</Form.Text>
            )}
            <Form.Text
              className="text-muted"
            >
              In most cases, you&apos;ll be able to change your username back
              to {userData.username} for another 14 days.
              <a className="text-primary no-decoration">Learn More</a>
            </Form.Text>
          </Form.Group>







          <Form.Group className="mt-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && (
              <Form.Text className="text-muted">{formErrors.firstName}</Form.Text>
            )}
            <Form.Text
              className="text-muted"
            >
              Help people discover your account by using the name
              you&apos;re known by.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              placeholder="Enter Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && (
              <Form.Text className="text-muted">{formErrors.lastName}</Form.Text>
            )}
            <Form.Text
              className="text-muted"
            >
              Help people discover your account by adding your
              surname to your account.
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-4 ">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <Form.Text className="text-muted">{formErrors.email}</Form.Text>
            )}
          </Form.Group>

          <Button variant="dark" className="my-3 w-100 following-btn" type="submit">Submit</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

export default EditProfileModalComponent