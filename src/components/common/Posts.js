import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
import { getAllPosts } from '../../lib/api'
// import StandardPostCard from '../posts/StandardPostCard'




function Posts() {
  const [posts, setPosts] = React.useState(null)

  React.useEffect(() => {
    const getPostsData = async () => {
      try {
        const res = await getAllPosts()
        setPosts(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPostsData()
  }, [])




  return (
    <>
      <div className="contain">
        <div className="flex-col contain">
          <div className="testing contain">
            {posts && posts.map(post => <p className="testing" key={post.id}>{post.title}</p>)}
          </div>
        </div>
      </div>




      {/* <div>
        <div >
          {posts && (
            posts.map(post => (
              // <div className="testing" key={post.id} xs lg="2"><StandardPostCard className="flex-col" post={post} /></div>
            ))
          )}
        </div>
      </div> */}






      {/* <Container className="testing">
        <Col className="justify-content-md-center">
          {posts && (
            posts.map(post => (
              <Row key={post.id} xs lg="2"><StandardPostCard post={post} /></Row>
            ))
          )}

        </Col>
      </Container> */}

      {/* <Container>
        <Row className="justify-content-md-center">
          {posts && (
            posts.map(post => (
              <Col className="testing" key={post.id} xs lg="2"><StandardPostCard post={post} /></Col>
            ))
          )}

        </Row>
      </Container> */}


      {/* <div className="special">
        <h1>Posts</h1>
        {posts && (
          <p>{posts.map(post => post.title)}</p>
        )}
      </div> */}
    </>
  )
}

export default Posts