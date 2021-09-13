import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function StandardPostCard({ post }) {

  return (
    <Link className="card-profile-link" to={`/posts/${post.id}/`} >
      <Card className="border-0 postcard">
        <Card.Img className="post-image" variant="top" src={post.image} title={post.title}/>
        {/* <Card.Body className="body">
          <Card.Title>{post.title}</Card.Title>
        </Card.Body> */}
      </Card>
    </Link>
  )
}

export default StandardPostCard