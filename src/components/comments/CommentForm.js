import { useParams } from 'react-router-dom'
import { createComment, getSinglePost } from '../../lib/api'
import React from 'react'
import { Form } from 'react-bootstrap'

const initialState = {
  text: '',
}

function CommentForm({ setPost, userData }) {
  const { postId } = useParams()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const commentRes = await createComment(postId, formData)
      const postRes = await getSinglePost(postId)
      console.log(commentRes)
      setFormData(initialState)
      setPost(postRes.data)
    } catch (err) {
      console.log(err.response)
      setFormErrors(err.response)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 comment-form" controlId="fromBasicText">
        <img className="user-images" src={userData.profileImage} />
        <Form.Control
          type="text"
          placeholder="Add a comment"
          name="text"
          className="comment-input"
          value={formData.text}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  )
}

export default CommentForm