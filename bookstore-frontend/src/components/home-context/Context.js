import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/context.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewsContext from '../news-context/NewsContext';
import EBookContext from '../ebook-context/EBookContext';


const Context = () => {
  return (
    <>
         <div className="container">
            {/* <Card className='card-outer' style={{}}>
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
            </Card> */}
            <EBookContext/>
            <NewsContext/>
          </div> 
    </>
  )
}

export default Context