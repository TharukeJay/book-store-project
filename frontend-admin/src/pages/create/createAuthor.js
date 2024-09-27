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
import {
    executeCreateAuthor, executeDeleteAuthor,
    executeDeleteCategory,
    executeGetAuthor,
    executeUpdateAuthor,
    executeUpdateCategory
} from "../../api/endPoints";


function Categories() {
    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [authorId, setAuthorId] = useState('');
    const [error, setError] = useState('');

    const getAuthor = async () => {
        setLoading(true)
        const response = await executeGetAuthor();
        const data = response.data;
        setAuthorData(data)
        setLoading(false)

    }
    const createAuthor = async () => {
        setLoading(true);
        if (authorName == '') {
            setError("Please enter a author name");
            return;
        }
        try {
            const response = await executeCreateAuthor(authorName);
            const data2 = response.data;
            setAuthorName(authorName);
            setLoading(false);
            getAuthor();
            setVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
            setError(error.response.data.error)
        }
    };


    useEffect(() => {
        getAuthor()
    }, [])

    // if (loading) {
    //     return <Loading />
    // }
    const handleVisible = () => {
        setError('')
        setVisible(true)
    }

    const edit = async (authorId,authorName) => {
        if(authorId != ''){
            setError('')
            setAuthorId(authorId)
            setAuthorName(authorName)
            setEditVisible(true)
        }
    }

    const updateMedia = async (e) => {
        const authorExists = authorData.some(data => data.data.authorName === authorName);
        e.preventDefault();

        if (authorName == '') {
            setError("Please enter a author name");
            return;
        }
        if(authorExists){
            setError("Author with the same name already exists.");
            return;
        }

        // if (!authorName) {
        //     alert("Author name and series title are required.");
        //     // setUploadNow(false);
        //     return;
        // }
        try {
            const data = await executeUpdateAuthor(authorId, authorName);
            console.log('author updated successfully:', data);
            await getAuthor();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating series:', error);
            setError(error.response.data.error)
        }
    }
    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteAuthor(authorId);
            const data = response.data;
            setLoading(false);
            await getAuthor();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setAuthorName('')
        setVisible(false)
        setEditVisible(false)
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
            <Button sm={8} variant={"success"} onClick={handleVisible}>
                Add New
            </Button>

            <Modal alignment="center" show={visible} onClose={() => setVisible(false)}>
                {/*<ModalHeader>*/}
                {/*    <ModalTitle>New Author</ModalTitle>*/}
                <ModalHeader  onClick={handleClose} style={{backgroundColor: '#212529'}}>
                    <ModalTitle style={{color: "white"}}>ADD NEW AUTHOR</ModalTitle>
                    <button type="button" className="btn-close" style={{filter: 'invert(1)'}}
                            onClick={handleClose}></button>

                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            AUTHOR NAME
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setAuthorName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) =>  {setAuthorName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }}/>
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" variant={"dark"} onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" variant={"success"} onClick={() => createAuthor(authorName)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                {/*<ModalHeader closeButton onClick={handleClose}>*/}
                {/*    <ModalTitle>UPDATE AUTHOR</ModalTitle>*/}
                {/*</ModalHeader>*/}
                <ModalHeader  onClick={handleClose} style={{backgroundColor: '#212529'}}>
                    <ModalTitle style={{color: "white"}}>UPDATE AUTHOR</ModalTitle>
                    <button type="button" className="btn-close" style={{filter: 'invert(1)'}}
                            onClick={handleClose}></button>

                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Author Name
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={authorName} onChange={(e) => {setAuthorName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }}  />
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <form onSubmit={updateMedia}>
                        <div className="row justify-content-md-center">
                            <Col xs lg={9}>
                                <Button type="submit"  variant={"success"} color="primary"  id="inputGroupFileAddon04">
                                    UPDATE
                                </Button>
                            </Col>

                            <Col>
                                <Button color="danger" variant={"dark"} onClick={() => Delete()}>
                                    DELETE
                                </Button>
                            </Col>
                        </div>
                    </form>
                </ModalBody>
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
                                    style={{
                                        backgroundColor: '#212529',
                                        borderColor: '#212529',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    onClick={() => edit(
                                        data.data.authorId,
                                        data.data.authorName,
                                    )}
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
                <Card className="mb-4"style={{marginRight:90, marginLeft:20}}>
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
