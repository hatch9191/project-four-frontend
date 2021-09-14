import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import { getSinglePost, editPost } from '../../lib/api'
import ImageUpload from '../posts/ImageUpload'
import Error from '../extras/Error'
import Loading from '../extras/Loading'

function EditPost() {

  const initialState = {
    title: '',
    description: '',
    image: '',
  }

  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !formData && !isError
  const { postId } = useParams()
  const history = useHistory()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSinglePost(postId)
        setFormData(res.data)
      } catch (err) {
        setIsError(true)
        setFormErrors(err.response.data)
      }
    }
    getData()
  }, [postId])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await editPost(postId, formData)
      history.push(`/posts/${postId}/`)
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
        <div className="create-card edit-card">
          {isError && <div className="px-4 py-5 text-center"><Error /></div>}
          {isLoading && <div className="px-4 py-5 text-center"><Loading /></div>}
          {!isError && (
            <Form onSubmit={handleSubmit}>
              <h4>Edit Post</h4>
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
              <Form.Group className="mb-3 image-upload">
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
                  Update Post
                </Button>
              </div>
            </Form>
          )}
        </div>
      </Container>
    </>
  )
}

export default EditPost