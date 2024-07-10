import React, { useState } from 'react';
import TopNavbar from "./nav_bars/Top_nav_bar";
import SideNavbar from "./nav_bars/Side_nav_bar";
import { Form, FormGroup, Button } from 'react-bootstrap';


function Home() {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div>
            <TopNavbar />
            <div style={{ display: 'flex' }}>
                <SideNavbar />
                <div style={{ marginLeft: '20px' }}>
                    <h2>BOOKS UPLOAD</h2>
                    <p>Welcome to the Home Page!</p>
                    <Form>
                        <FormGroup>
                            <Form.Label>Select Category:</Form.Label>
                            <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                                {/* Add options for categories */}
                            </Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Select book Type:</Form.Label>
                            <Form.Control as="select" value={type} onChange={handleTypeChange}>
                                <option value={''}>select book</option>
                                <option value={'PDF'}>PDF</option>
                                <option value={'audioBook'}>Audio book</option>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" value={title} onChange={handleTitleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Select Author:</Form.Label>
                            <Form.Control as="select" value={author} onChange={handleAuthorChange}>
                                {/* Add options for authors */}
                            </Form.Control>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Book Price:</Form.Label>
                            <Form.Control type="text" value={price} onChange={handlePriceChange} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
                        </FormGroup>
                        <Button variant="primary">Upload</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Home;
