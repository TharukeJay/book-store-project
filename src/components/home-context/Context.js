import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/context.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Context = () => {
  return (
    <>
      <div className="container">
          <Card className='card-outer' style={{}}>
              <Card className='img img1' />
              <Card.Body>
                  <Button variant="primary" href='/news'>News Letter</Button>
              </Card.Body>
          </Card>
          <Card className='card-outer'>
              <Card className='img img2'/>
              <Card.Body>
                  <Button variant="primary" href='/book-store'>E Book</Button>
              </Card.Body>
          </Card>
      </div>
    </>
  )
}

export default Context
