import React from 'react'
import { Container } from 'react-bootstrap'

import StandardPostCard from '../posts/StandardPostCard'
import { isAuthenticated } from '../../lib/auth'

function Posts({ setLoggedIn, posts }) {



  setLoggedIn(isAuthenticated())

  return (
    <>
      <Container className="posts-body" >
        {posts && posts.map(post => <StandardPostCard post={post} key={post.id} />)}
      </Container>
    </>
  )
}

export default Posts