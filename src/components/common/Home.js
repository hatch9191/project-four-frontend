import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import RegisterCard from '../auth/RegisterCard'
import LoginCard from '../auth/LoginCard'

function Home() {

  const [registered, setRegistered] = React.useState(false)

  return (
    <Container className="hero" fluid>
      <Row className="centered">
        <Col sm={7}>
          <h1 className="display-5">Find and Follow Exciting Artists</h1>
          <div className="py-3"></div>
          <h1 className="display-5">Post Your Own Art</h1>
        </Col>
        <Col sm={4}>
          {!registered && (
            <RegisterCard registered={registered} setRegistered={setRegistered}/>
          )}
          {registered && (
            <LoginCard setRegistered={setRegistered}/>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home