import {
    executeCreatePictureRim, executeDeletePictureRim,
    executeGetPictureRim,
    executeUpdatePictureRim
} from "../../api/endPoints";
import React, {useEffect, useState} from "react";
import ScreenLoading from "../Loading";
import {
    Button, Card, CardBody, CardHeader,
    Col,
    FormLabel,
    FormSelect, Image,
    InputGroup,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle, ProgressBar,
    Row, Table
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const PictureRim = () => {
    const [pictureRimData, setPictureRimData] = useState([]);
    const [pictureRimTitle, setPictureRimTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [uploadNow, setUploadNow] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [pictureRimID, setPictureRimID] = useState('')
    const [editVisible, setEditVisible] = useState(false)

    const getPictureRim = async () => {
        setLoading(true)
        const response = await executeGetPictureRim();
        const data = response.data;
        setPictureRimData(data)
        setLoading(false)

    }

    // REACT JS - USE EFFECT FUNCTION
    useEffect(() => {
        getPictureRim()
    }, [])



    // firebase - store data into firebase collection
    const uploadMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!description) {
            alert("description required.");
            setUploadNow(false);
            return;
        }

        const formData = new FormData();
        formData.append('pictureRimTitle', pictureRimTitle);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        try {
            const response = await executeCreatePictureRim(formData).then(function (response) {
                console.log(response.data);
                setUploadNow(false)
                setVisible(false)
                getPictureRim()
                alert('Picture Rim created Successfully')
            })
        } catch (error) {
            console.error("There was an error creating the Picture Rim:", error);
        }
    }

    const updateMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!description) {
            alert("Author name and Picture Rim title are required.");
            setUploadNow(false);
            return;
        }
        try {
            const data = await executeUpdatePictureRim(pictureRimID,pictureRimTitle, description, thumbnail);
            console.log('Picture Rim updated successfully:', data);
            await getPictureRim();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating Picture Rim:', error);
        }
    }

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

    const edit = async (id,title,description,thumbnail_url) => {
        if(id != ''){
            setPictureRimID(id)
            setDescription(description)
            setPictureRimTitle(title)
            setThumbnail(thumbnail_url)
            setEditVisible(true)
        }
    }

    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeletePictureRim(pictureRimID);
            const data = response.data;
            setLoading(false);
            await getPictureRim();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setPictureRimTitle('')
        setVisible(false)
        setSelectedImage(null)
        // setHide(false)
        // setFeaturedContent(false)
        // setDisplayFeaturedContent('')
        setEditVisible(false)
    }


    const handleAddNew = () => {
        setDescription('')
        setPictureRimTitle('')
        setVisible(!visible)
    }
    if (loading) {
        return <ScreenLoading />
    }

    return (
        <>
            <Button sm={8} onClick={handleAddNew}>
                Add New
            </Button>
            {/* CREATE */}
            <Modal alignment="center" show={visible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>Create Picture Rim </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Picture Rim  Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setPictureRimTitle(e.target.value)}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Description
                        </FormLabel>
                        <Col sm={8}>
                            {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                            <Form.Control as="textarea" aria-label="With textarea" onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Row>

                    {selectedImage ? (
                        <Row className="mb-3">
                            <Image  align="center" rounded src={selectedImage} />
                        </Row>
                    ) : null}

                    <form onSubmit={uploadMedia}>
                        <Row className="mb-2">
                            <Col md={12} className="position-relative">
                                <input type="file" onChange={imageChange} required />
                            </Col>
                        </Row>

                        {/*{uploadNow == false ? (*/}
                        <Button type="submit" accept=".webp" variant="dark" id="inputGroupFileAddon04">
                            Upload now
                        </Button>
                        {/*) : null}*/}
                    </form>
                </ModalBody>
            </Modal>

            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>UPDATE  PICTURE RIM </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Picture Rim Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={pictureRimTitle} onChange={(e) => setPictureRimTitle(e.target.value)}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Description
                        </FormLabel>
                        <Col sm={8}>
                            {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                            <Form.Control as="textarea" aria-label="With textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Col>
                    </Row>

                    {selectedImage ? (
                        <Row className="mb-3">
                            <Image align="center" rounded src={selectedImage} />
                        </Row>
                    ) : (<Row className="mb-3">
                        <Image  align="center" rounded src={thumbnail} />
                    </Row>)}
                    <Row></Row>
                    <form onSubmit={updateMedia}>
                        <Row className="mb-2">
                            <Col md={12} className="position-relative">
                                <input type="file" onChange={imageChangeUpdate}  />
                            </Col>
                        </Row>

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

            {/* react - Table sub categories list */}
            <Table>
                <thead color="light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">THUMBNAIL</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {pictureRimData.map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            <th>
                                <img width={100} src={data.data.thumbnail_url} />
                            </th>
                            <th>{data.data.title ? data.data.title : 'N/A'}</th>
                            <th>{data.data.description}</th>

                            <th>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    onClick={() => edit(
                                        data.data.pictureRimId,
                                        data.data.title,
                                        data.data.description,
                                        data.data.thumbnail_url,
                                    )}
                                >
                                    Edit
                                </Button>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}

const Index = () => {
    return (
        <Row>
            <Col xs={12}>
                <Card className="mb-4">
                    <CardHeader>
                        <h2>PICTURE RIM LIST</h2>
                    </CardHeader>
                    <CardBody>{PictureRim()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
