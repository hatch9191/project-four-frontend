import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { registerUser } from '../../lib/api'

function RegisterCard({ registered, setRegistered }) {

  const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptTerms: null,
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  

  const handleChange = e => {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleLogin = () => {
    setRegistered(true)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (formData.acceptTerms === !true) {
        throw 'Terms not accepted...'
      }
      await registerUser(formData)
      setRegistered(true)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }
  console.log(registered)

  return (
    <>
      <Container className="login-signup-container">
        <Form onSubmit={handleSubmit}>
          <h4>Welcome to Painterest</h4>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="username"
              placeholder="Enter Username"
              name="username"
              className={`${formErrors.username ? 'is-invalid' : ''}`}
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <Form.Text className="text-muted">{formErrors.username}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              className={`${formErrors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <Form.Text className="text-muted">{formErrors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              className={`${formErrors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <Form.Text className="text-muted">{formErrors.password}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              className={`${formErrors.passwordConfirmation ? 'is-invalid' : ''}`}
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
            {formErrors.passwordConfirmation && (
              <Form.Text className="text-muted">
                {formErrors.passwordConfirmation}
              </Form.Text>
            )}
          </Form.Group>
      
          <div className="d-grid gap-2">
            <Button variant="danger" type="submit" className="form-inputs">
              Sign Up
            </Button>
          </div>
          <p className="terms-info">By continuing, you agree to Painterest&apos;s <Link className="terms-link" to="/terms">Terms of Service</Link> and acknowledge you&apos;ve read our <Link className="terms-link" to="/privacy">Privacy Policy</Link></p>
          <hr />
          <p className="login-toggle" onClick={handleLogin}><strong>Already have an account? Log in</strong></p>
        </Form>
      </Container>
    </>
  )
}

export default RegisterCard

{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Check type="checkbox">
  <Form.Check.Input type="checkbox"
    name="acceptTerms"
    className={`checkbox ${formErrors.acceptTerms ? 'is-invalid' : ''}`}
    checked={formData.acceptTerms}
    value={formData.acceptTerms}
    onChange={handleChange}
  />
  <Form.Check.Label>I&apos;ve read and accept the <a href="/terms">T&amp;C&apos;s</a></Form.Check.Label>
</Form.Check>
{formErrors.acceptTerms && (
  <Form.Text className="text-muted">
    {/* {formErrors.acceptTerms} */}
//     Please Accept our T&Cs
//   </Form.Text>
// )}
// </Form.Group> */}