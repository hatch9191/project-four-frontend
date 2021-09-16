import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import { createPost } from '../../lib/api'
import ImageUpload from '../posts/ImageUpload'
import StandardPostCard from './StandardPostCard'
// import Select from 'react-select'

function NewPost({ posts }) {

  const initialState = {
    title: '',
    description: '',
    image: '',
    movement: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const history = useHistory()
  let a = 1

  const options = [
    { label: 'Ukiyo-e', value: 'Ukiyo-e' },
    { label: 'Surrealism', value: 'Surrealism' },
    { label: 'Street', value: 'Street' },
    { label: 'Romanticism', value: 'Romanticism' },
    { label: 'Renaissance', value: 'Renaissance' },
    { label: 'Primitivism', value: 'Primitivism' },
    { label: 'Postcolonial', value: 'Postcolonial' },
    { label: 'Post-Modernism', value: 'Post-Modernism' },
    { label: 'Post-Impressionism', value: 'Post-Impressionism' },
    { label: 'Pop Art', value: 'Pop Art' },
    { label: 'Neo-Impressionism', value: 'Neo-Impressionism' },
    { label: 'Modernism', value: 'Modernism' },
    { label: 'Modern', value: 'Modern' },
    { label: 'Expressive Abstractionism', value: 'Expressive Abstractionism' },
    { label: 'Dutch Golden Age', value: 'Dutch Golden Age' },
    { label: 'Cubism', value: 'Cubism' },
    { label: 'Contemporary', value: 'Contemporary' },
    { label: 'Art Nouveau', value: 'Art Nouveau' },
    { label: 'Abstract Expressionism', value: 'Abstract Expressionism' },
    { label: 'Abstract', value: 'Abstract' }
  ]


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
      {posts && (
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
                    as="textarea"
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
                  <Form.Control
                    as="select"
                    name="movement"
                    onChange={handleChange}>
                    <option value="" disabled selected>Select Style/Movement</option>
                    {options.map(post => (
                      <option key={a += 1} value={post.value}>{post.label}</option>
                    ))}
                  </Form.Control>
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
      )}

    </>
  )
}

export default NewPost