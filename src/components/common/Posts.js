import React from 'react'
import { Container } from 'react-bootstrap'

import StandardPostCard from '../posts/StandardPostCard'
import { isAuthenticated } from '../../lib/auth'
import Loading from '../extras/Loading'

function Posts({ setLoggedIn, posts }) {



  setLoggedIn(isAuthenticated())

  return (
    <>
      {!posts && (
        <div className="flex-div-center-2 py-4 my-4">
          <Loading />
        </div>
      )}
      <Container className="posts-body" >
        {posts && posts.map(post => <StandardPostCard post={post} key={post.id} />)}
      </Container>
    </>
  )
}

export default Posts