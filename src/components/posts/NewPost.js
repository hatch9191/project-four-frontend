import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import { createPost } from '../../lib/api'
import ImageUpload from '../posts/ImageUpload'
import StandardPostCard from './StandardPostCard'

function NewPost({ posts }) {

  const initialState = {
    title: '',
    description: '',
    image: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const history = useHistory()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log(formData)
      const { data } = await createPost(formData)
      history.push(`/posts/${data.id}/`)
      console.log(data)
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  const handleImageUpload = (imageUrl, name) => {
    setFormData({ ...formData, [name]: imageUrl })
  }

  return (
    <>
      <Container className="create-page" fluid>
        <div className="create-card">
          <Form onSubmit={handleSubmit}>
            <h4>Create a Post</h4>
            <Form.Group className="mb-3">
              {/* <Form.Label>Title</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {formErrors.title && (
                <Form.Text className="text-muted">{formErrors.title}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>Description</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {formErrors.description && (
                <Form.Text className="text-muted">{formErrors.description}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <ImageUpload
                // labelText="Image"
                name="image"
                value={formData.image}
                onChange={handleImageUpload}
              />
              {formErrors.image && (
                <Form.Text className="text-muted">
                  {formErrors.image}
                </Form.Text>
              )}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="danger" type="submit">
                Post It
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <Container className="related-posts">
        <h4>Some Inspiration</h4>
      </Container>
      <Container className="posts-body related" >
        {posts && posts.map(post => <StandardPostCard post={post} key={post.id} />)}
      </Container>
    </>
  )
}

export default NewPost