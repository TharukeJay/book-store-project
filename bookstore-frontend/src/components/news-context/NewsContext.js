import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/newscontext.css';
import { Link } from "react-router-dom";



const NewsContext = () => {
  return (
    <>
    <br /><br />
      <div className="news-context-outer">
        <Stack direction="horizontal" gap={3}>
          <Form.Control className="me-auto" placeholder="Add your item here..." />
          <Button variant="secondary">Submit</Button>
        </Stack>
      </div>
      <br /><br />
      <div className="work-container">
        <div className="project-container">
            <div className="project-card">
                <img src='' alt="image" />
                <h2 className="project-title">  </h2>
                <div className="pro-details">
                    <p></p>
                    <div className="pro-btns">
                        <Link to='' lassName="btn btn-dark source"> View Source Code</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default NewsContext
