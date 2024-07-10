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
    ModalBody, FormLabel, ModalFooter, Table, InputGroup, FormSelect, Image
} from 'react-bootstrap';
import {executeLoginUser} from "../../api/loginUser";
import {
    executeCreateCategory, executeDeleteBookSeries, executeDeleteCategory,
    executeGetCategory,
    executeUpdateBookSeries,
    executeUpdateCategory
} from "../../api/endPoints";

function Categories() {
    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editVisible, setEditVisible] = useState(false)
    const [error, setError] = useState('');

    const getCategory = async () => {
        setLoading(true)
        const response = await executeGetCategory();
        const data = response.data;
            setCategoryData(data)
            setLoading(false)

    }

    const createCategory = async () => {
        setLoading(true);
        if (categoryName == '') {
            setError("Please enter a category name");
            return;
        }
        try {
            const response = await executeCreateCategory(categoryName);
            const data = response.data;
            setCategoryName(categoryName);
            setLoading(false);
            getCategory();
            setVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating category:', error);
            setError(error.response.data.error)
        }
    };


    useEffect(() => {
        getCategory()
    }, [])


    const handleVisible = () => {
        setError('')
        setVisible(true)
    }

    const edit = async (categoryId,categoryName) => {
        if(categoryId != ''){
            setError('')
            setCategoryId(categoryId)
            setCategoryName(categoryName)
            setEditVisible(true)
        }
    }

    const updateMedia = async (e) => {
        // setUploadNow(true)
        const categoryExists = categoryData.some(data => data.data.categoryName === categoryName);
        e.preventDefault();

        if (categoryName == '') {
            setError("Please enter a category name");
            return;
        }
        if(categoryExists){
            setError("Category with the same name already exists.");
            return;
        }
        try {
            const data = await executeUpdateCategory(categoryId, categoryName);
            console.log('Series updated successfully:', data);
            await getCategory();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating series:', error);
            setError(error.response.data.error)
        }
    }
    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteCategory(categoryId);
            const data = response.data;
            setLoading(false);
            await getCategory();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setCategoryName('')
        setVisible(false)
        setEditVisible(false)
    }

    return (
        <>
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
                    <ModalTitle>New Category</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            CATEGORY NAME
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setCategoryName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => {setCategoryName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }} />
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" onClick={() => createCategory(categoryName)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>UPDATE CATEGORY</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Category Name
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={categoryName} onChange={(e) => {setCategoryName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }}/>
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
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
                        <th scope="col">CATEGORY NAME</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryData.map((data, index) => {
                        return (
                            <tr key={data.data}>
                                <td scope="row">{index + 1}</td>
                                <td>{data.data.categoryName}</td>

                                <td>
                                    <Button
                                        color="success"
                                        className="me-md-4"
                                        active
                                        tabIndex={-1}
                                        onClick={() => edit(
                                            data.data.categoryId,
                                            data.data.categoryName,
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
                        <h2>CATEGORY LIST</h2>
                    </CardHeader>
                    <CardBody>{Categories()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default Validation;


