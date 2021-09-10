import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function LoginCard({ setRegistered }) {

  const initialState = {
    username: '',
    password: '',
  }

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSignUp = () => {
    setRegistered(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(formData)
      setToken(data.token)
      history.push('/posts/')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <>
      <Container className="login-signup-container">
        <Form onSubmit={handleSubmit}>
          <h4>Welcome to Painterest</h4>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Keep me logged in" />
            {isError && (
              <Form.Text className="text-center">
                Either email or password were incorrect. Please try again or request a <a href="">password reset email</a>.
              </Form.Text>
            )}
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="danger" type="submit">
              Login
            </Button>
          </div>
          <p className="text-center"><strong><a onClick={handleSignUp}>Not on Painterest yet? Sign up</a></strong></p>
        </Form>
      </Container>
    </>
  )
}

export default LoginCard
