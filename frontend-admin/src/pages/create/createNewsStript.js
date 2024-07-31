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
    executeCreateNewsStript,
    executeDeleteNewsStript,
    executeGetNewsStript,
    executeUpdateNewsStript
} from "../../api/endPoints";




function Categories() {
    const [newsStriptData, setNewsStriptData] = useState([]);
    const [newsStriptTitle, setNewsStriptTitle] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [newsStriptId, setNewsStriptId] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');


    const getNewsStript = async () => {
        setLoading(true)
        const response = await executeGetNewsStript();
        const data = response.data;
        setNewsStriptData(data)
        setLoading(false)

    }
    const createNewsStript = async () => {
        setLoading(true);
        // if (NewsStriptTitle == '') {
        //     setError("Please enter a NewsStript title");
        //     return;
        // }
        if (description == '') {
            setError("Please enter a description");
            return;
        }
        try {
            const response = await executeCreateNewsStript(newsStriptTitle,description);
            const data2 = response.data;
            setNewsStriptTitle(newsStriptTitle);
            setDescription(description);
            alert('News stript added successfully!')
            setLoading(false);
            await getNewsStript();
            setVisible(false)

        } catch (error) {
            setLoading(false);
            console.error('Error creating getNewsStripts:', error);
            setError(error.response.data.error)
        }
    };


    useEffect(() => {
        getNewsStript()
    }, [])

    // if (loading) {
    //     return <Loading />
    // }
    const handleVisible = () => {
        setNewsStriptTitle('')
        setDescription('')
        setError('')
        setVisible(true)
    }

    const edit = async (newsStriptId,newsStriptTitle,description) => {
        if(newsStriptId != ''){
            setError('')
            setNewsStriptId(newsStriptId)
            setNewsStriptTitle(newsStriptTitle)
            setDescription(description)
            setEditVisible(true)
        }
    }

    const updateMedia = async (e) => {
        // const newsStriptExists = authorData.some(data => data.data.authorName === authorName);
        e.preventDefault();

        if (description == '') {
            setError("Please enter a description");
            return;
        }
        try {
            const data = await executeUpdateNewsStript(newsStriptId, newsStriptTitle,description);
            console.log('author updated successfully:', data);
            await getNewsStript();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating series:', error);
            setError(error.response.data.error)
        }
    }
    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteNewsStript(newsStriptId);
            const data = response.data;
            setLoading(false);
            await getNewsStript();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setNewsStriptTitle('')
        setVisible(false)
        setEditVisible(false)
    }


    return (
        <>
            {console.log('authorData==>',newsStriptData)}
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
                    <ModalTitle>New Stript</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Stript Title
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setAuthorName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) =>  {setNewsStriptTitle(e.target.value);}} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Description
                        </FormLabel>
                        <Col sm={8}>
                            {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                            <Form.Control as="textarea" aria-label="With textarea" value={description} onChange={(e) => {setDescription(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }} />
                            {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" onClick={createNewsStript}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>UPDATE NEWS STRIPT</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            News Stript Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={newsStriptTitle} onChange={(e) => {setNewsStriptTitle(e.target.value);}}   />

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Description
                        </FormLabel>
                        <Col sm={8}>
                            {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                            <Form.Control as="textarea" aria-label="With textarea" value={description} onChange={(e) => {setDescription(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }}/>
                            {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                        </Col>
                    </Row>

                    <form onSubmit={updateMedia}>
                        <div className="row justify-content-md-center">
                            <Col xs lg={9}>
                                <Button type="submit" color="primary" variant="outline" id="inputGroupFileAddon04">
                                    UPDATE
                                </Button>
                            </Col>

                            <Col>
                                <Button color="danger" onClick={() => Delete()}>
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
                    <th scope="col">SCRIPT TITLE</th>
                    <th scope="col">DESCRIPTION</th>
                </tr>
                </thead>
                <tbody>
                {newsStriptData.map((data, index) => {
                    return (
                        <tr key={data.data}>
                            <td scope="row">{index + 1}</td>
                            <td>{data.data.newsScriptTitle ? data.data.newsScriptTitle :'N/A' }</td>
                            <td>{data.data.description}</td>

                            <td>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    onClick={() => edit(
                                        data.data.newsScriptId,
                                        data.data.newsScriptTitle,
                                        data.data.description,
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
                <Card className="mb-4">
                    <CardHeader>
                        <h2>NEWS STRIPT LIST</h2>
                    </CardHeader>
                    <CardBody>{Categories()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default Validation;
