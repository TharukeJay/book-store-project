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
    executeCreateNewsCategory,
    executeDeleteNewsCategory,
    executeGetNewsCategory,
    executeUpdateNewsCategory
} from "../../api/endPoints";


function Categories() {
    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [editVisible, setEditVisible] = useState(false)
    const [error, setError] = useState('');
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailName, setThumbnailName] = useState('')
    const [selectedImage, setSelectedImage] = useState('')

    const getNewsCategory = async () => {
        setLoading(true)
        const response = await executeGetNewsCategory();
        const data = response.data;
        setCategoryData(data)
        setLoading(false)

    }
    const createNewsCategory = async () => {
        setLoading(true);
        if (categoryName == '') {
            setError("Please enter a category name");
            return;
        }
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('thumbnail', thumbnail);
        try {
            const response = await executeCreateNewsCategory(formData);
            const data = response.data;
            setCategoryName(categoryName);
            setLoading(false);
            alert('Category updated successfully:');
            getNewsCategory();
            setVisible(false)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error creating category:', error);
            setError(error.response.data.error)
            setLoading(false);
        }
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
            setThumbnail(e.target.files[0]);
        }
    }
    const imageChangeUpdate = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]))
            setThumbnail(e.target.files[0]);
        }
    }


    useEffect(() => {
        getNewsCategory()
    }, [])

    // if (loading) {
    //     return <Loading />
    // }
    const handleVisible = () => {
        setError('')
        setVisible(true)
        setThumbnail('')
        setSelectedImage('')
    }

    const edit = async (categoryId,categoryName,thumbnail_url,thumbnail_fileName) => {
        if(categoryId != ''){
            setError('')
            setCategoryId(categoryId)
            setCategoryName(categoryName)
            setEditVisible(true)
            setThumbnail(thumbnail_url)
            setThumbnailName(thumbnail_fileName)
        }
    }

    const updateMedia = async (e) => {
        const categoryExists = categoryData.some(data => (data.data.categoryId !== categoryId) && data.data.categoryName === categoryName);
        // setUploadNow(true)
        setLoading(true)
        e.preventDefault();
        if (categoryName == '') {
            setError("Please enter a category name");
            setLoading(false);
            return;
        }
        if(categoryExists){
            setError("Category with the same name already exists.");
            setLoading(false);
            return;
        }
        try {
            const data = await executeUpdateNewsCategory(categoryId, categoryName,thumbnail);
            console.log('Series updated successfully:', data);
            alert('Category updated successfully:');
            await getNewsCategory();
            setEditVisible(false)
            setLoading(false);
        } catch (error) {
            console.error('Error updating series:', error);
            setError(error.response.data.error)
            setLoading(false);
        }
    }
    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteNewsCategory(categoryId);
            const data = response.data;
            setLoading(false);
            await getNewsCategory();
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
            <Button sm={8}  variant={"success"} onClick={handleVisible}>
                Add New
            </Button>

            <Modal alignment="center" show={visible} onClose={() => setVisible(false)}>
                {/*<ModalHeader>*/}
                {/*    <ModalTitle>New News Category</ModalTitle>*/}
                {/*</ModalHeader>*/}
                <ModalHeader  onClick={handleClose} style={{backgroundColor: '#212529'}}>
                    <ModalTitle style={{color: "white"}}>New News Category</ModalTitle>
                    <button type="button" className="btn-close" style={{filter: 'invert(1)'}}
                            onClick={handleClose}></button>

                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            CATEGORY NAME
                        </FormLabel>
                        <Col sm={8}>
                            {/*<FormInput type="text" onChange={(e) => setCategoryName(e.target.value)} />*/}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) =>{setCategoryName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }} />
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    {selectedImage ? (
                        <Row className="mb-3">
                            <Image  align="center" rounded src={selectedImage} />
                        </Row>
                    ) : null}
                    <Row className="mb-2">
                        <Col md={12} className="position-relative">
                            <input type="file" onChange={imageChange} required />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" variant={"dark"} onClick={() => setVisible(false)}>
                        Close
                    </Button>
                    <Button color="primary" variant={"success"} onClick={() => createNewsCategory(categoryName)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                {/*<ModalHeader closeButton onClick={handleClose}>*/}
                {/*    <ModalTitle>UPDATE NEWS CATEGORY</ModalTitle>*/}
                {/*</ModalHeader>*/}
                <ModalHeader  onClick={handleClose} style={{backgroundColor: '#212529'}}>
                    <ModalTitle style={{color: "white"}}>UPDATE NEWS CATEGORY</ModalTitle>
                    <button type="button" className="btn-close" style={{filter: 'invert(1)'}}
                            onClick={handleClose}></button>

                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Category Name
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={categoryName} onChange={(e) =>{setCategoryName(e.target.value);setError('')}} style={{ borderColor: error ? 'red' : '' }}  />
                                {error && <Form.Text className="text-danger" style={{fontSize:14,fontWeight:"bold"}}>{error}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>
                    {selectedImage ? (
                        <Row className="mb-3">
                            <Image  align="center" rounded src={selectedImage} />
                        </Row>
                    ) : null}
                    <Row className="mb-2">
                        <Col md={12} className="position-relative">
                            {thumbnailName ? thumbnailName : ''}
                        </Col>
                    </Row>

                    <form onSubmit={updateMedia}>
                        <Row className="mb-2">
                            <Col md={12} className="position-relative">
                                <input type="file" onChange={imageChangeUpdate}  />
                            </Col>
                        </Row>
                        <div className="row justify-content-md-center">
                            <Col xs lg={9}>
                                <Button type="submit" variant={"success"} color="primary" id="inputGroupFileAddon04">
                                    UPDATE
                                </Button>
                            </Col>

                            <Col>
                                <Button color="danger"  variant={"dark"} onClick={() => Delete()}>
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
                    <th scope="col">THUMBNAIL</th>
                    <th scope="col">CATEGORY NAME</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {categoryData.map((data, index) => {
                    return (
                        <tr key={data.data}>
                            <td scope="row">{index + 1}</td>
                            <td>
                                <img width={100} src={data.data.thumbnail_url}/>
                            </td>
                            <td>{data.data.categoryName}</td>

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
                                        data.data.categoryId,
                                        data.data.categoryName,
                                        data.data.thumbnail_url,
                                        data.data.thumbnail_fileName,
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
                        <h2>NEWS CATEGORY LIST</h2>
                    </CardHeader>
                    <CardBody>{Categories()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default Validation;

