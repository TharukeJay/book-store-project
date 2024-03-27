import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const EBookContext = () => {
  return (
    <>
      <br /><br />
      <div className="ebook-context-outer">
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="Add your item here..." />
          <Button variant="secondary">Submit</Button>
        </Stack>
      </div>
      <br />
      {/* <Container>
        <Row>
          <Col sm className='row'>sm=true</Col>
        </Row>
      </Container> */}
      <Container>
        <Row>
          <Col xs={6} md={12}>
            <Image src="../../assest/img/E-book.png" thumbnail />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EBookContext
