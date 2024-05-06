import React, { useState } from 'react';
import {Form, FormGroup, Button, Modal, Table, Row, Col} from 'react-bootstrap';
import TopNavbar from "../nav_bars/Top_nav_bar";
import SideNavbar from "../nav_bars/Side_nav_bar";


function Home() {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // const handleCategoryChange = (event) => {
    //     setCategory(event.target.value);
    // };
    //
    // const handleTypeChange = (event) => {
    //     setType(event.target.value);
    // };
    //
    // const handleTitleChange = (event) => {
    //     setTitle(event.target.value);
    // };
    //
    // const handleAuthorChange = (event) => {
    //     setAuthor(event.target.value);
    // };
    //
    // const handlePriceChange = (event) => {
    //     setPrice(event.target.value);
    // };
    //
    // const handleDescriptionChange = (event) => {
    //     setDescription(event.target.value);
    // };

    return (
        <div>
            <TopNavbar />
            <div style={{ display: 'flex' }}>
                <SideNavbar />
                <div style={{ marginLeft: '20px' }}>
                    <h2>CREATE AUTHOR</h2>
                    <Button variant="primary" size="sm">
                        Add New
                    </Button>

                    {/*<Modal show={visible} onHide={() => setVisible(false)} centered>*/}
                    <Modal>
                        <Modal.Header closeButton>
                            <Modal.Title>New Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>
                                    CATEGORY NAME
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} />
                                </Col>
                            </Form.Group>
                            {/* Render your other components */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" >
                                {/*<Button variant="secondary" onClick={() => removeBannerImages()}>*/}
                                Close
                            </Button>
                            <Button variant="primary">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Define your other modals similarly */}

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>AUTHOR NAME</th>
                            <th>ACTION</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{myData.map((data, index) => (*/}
                        {/*    <tr key={data.id}>*/}
                        {/*        <td>{index + 1}</td>*/}
                        {/*        <td>{data.name}</td>*/}
                        {/*        <td>*/}
                        {/*            <Button variant="success" onClick={() => edit(data.id)}>*/}
                        {/*                Edit*/}
                        {/*            </Button>*/}
                        {/*        </td>*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    );
}

export default Home;
