import React, {useEffect, useState} from 'react';
import Loading from "react-loading";

import {
    Col,
    Row,
    Form,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody, FormLabel, ModalFooter, Table
} from 'react-bootstrap';
import {executeLoginUser} from "../../api/loginUser";
import {executeCreateAuthor, executeGetAuthor} from "../../api/endPoints";


function Categories() {
    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const getAuthor = async () => {
        setLoading(true)
        const response = await executeGetAuthor();
        const data = response.data;
        setAuthorData(data)
        setLoading(false)

    }
    const createAuthor = async () => {
        setLoading(true);
        try {
            const response = await executeCreateAuthor(authorName);
            const data = response.data;
            setAuthorName(authorName);
            setLoading(false);
            getAuthor();
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    };


    useEffect(() => {
        getAuthor()
    }, [])

    // if (loading) {
    //     return <Loading />
    // }
    const handleVisible = () => {
        setVisible(true)
    }


    return (
        <>
            {console.log('authorData==>',authorData)}
            {/*<Button*/}
            {/*    variant="primary"*/}
            {/*    onClick={handleVisible}*/}
            {/*>*/}
            {/*    Add New*/}
            {/*</Button>*/}
            <Button sm={8} onClick={handleVisible}>
                Add New
            </Button>

            <Modal alignment="center" show={visible} onClose={() => setVisible(false)}>
                <ModalHeader>
                    <ModalTitle>New Author</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            AUTHOR NAME
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setAuthorName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setAuthorName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" onClick={() => createAuthor(authorName)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Table>
                <thead color="light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">AUTHOR NAME</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {authorData.map((data, index) => {
                    return (
                        <tr key={data.data}>
                            <td scope="row">{index + 1}</td>
                            <td>{data.data.authorName}</td>

                            <td>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    );
}
const Validation = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2>AUTHOR LIST</h2>
                    </CardHeader>
                    <CardBody>{Categories()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default Validation;
