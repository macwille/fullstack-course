import React from 'react'
import { Spinner, Container } from 'react-bootstrap'

const Loading = () => {
  return (
    <Container >
      <Spinner animation="border" ></Spinner>
    </Container>
  )
}

export default Loading