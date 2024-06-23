import {
    executeCreateNews, executeDeleteNews, executeGetNews,
    executeUpdateNews
} from "../../api/endPoints";
import React, {useEffect, useState} from "react";
import ScreenLoading from "../Loading";
import {
    Button, Card, CardBody, CardHeader,
    Col,
    FormLabel,
    Image,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Row, Table
} from "react-bootstrap";
import Form from 'react-bootstrap/Form';


const News = () => {

    const [newsData, setNewsData] = useState([]);
    const [selectedNewsData, setSelectedNewsData] = useState([]);
    const [newsTitle, setNewsTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [uploadNow, setUploadNow] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [newsID, setNewsID] = useState('')


    const [editVisible, setEditVisible] = useState(false)
    const [subcategory, setSubcategory] = useState()
    const [editId, setEditId] = useState()

    const [episodes, setEpisodes] = useState()
    const [hide, setHide] = useState(false)
    const [displayFeaturedContent, setDisplayFeaturedContent] = useState('')
    const [featuredContent, setFeaturedContent] = useState(false)
    const [contentProvider, setContentProvider] = useState('')
    const [contentProviderData, setContentProviderData] = useState([])
    const [contentProviderTitle, setContentProviderTitle] = useState('')



    const getNews = async () => {
        setLoading(true)
        const response = await executeGetNews();
        const data = response.data;
        console.log('get news data===>',data);
        setNewsData(data)
        setLoading(false)

    }



    // REACT JS - USE EFFECT FUNCTION
    useEffect(() => {
        getNews()
    }, [])



    // firebase - store data into firebase collection
    const uploadMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!description || !newsTitle) {
            alert("newsTitle and description are required.");
            setUploadNow(false);
            return;
        }

        const formData = new FormData();
        formData.append('newsTitle', newsTitle);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);

        try {
            const response = await executeCreateNews(formData).then(function (response) {
                console.log(response.data);
                setUploadNow(false)
                setVisible(false)
                getNews()
                alert('News created Successfully')
            })
        } catch (error) {
            console.error("There was an error creating the News:", error);
        }
    }

    const updateMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!description || !newsTitle) {
            alert("description name and News title are required.");
            setUploadNow(false);
            return;
        }
        try {
            const data = await executeUpdateNews(newsID,newsTitle, description, thumbnail);
            console.log('News updated successfully:', data);
            getNews();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating news:', error);
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

    const edit = async (id,newsTitle,description, thumbnail_url,) => {
        if(id != ''){
            setNewsID(id)
            setDescription(description)
            setNewsTitle(newsTitle)
            setThumbnail(thumbnail_url)
            setEditVisible(true)
        }
    }

    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteNews(newsID);
            const data = response.data;
            setLoading(false);
            getNews();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating news:', error);
        }
    }

    const handleClose = () => {
        setNewsTitle('')
        setVisible(false)
        setSelectedImage(null)
        setDescription('')
        // setFeaturedContent(false)
        // setDisplayFeaturedContent('')
        setEditVisible(false)
    }


    const handleAddNew = () => {
        setNewsTitle('')
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
                    <ModalTitle>Create News</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            News Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setNewsTitle(e.target.value)}  />
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
                                {/*<InputGroup className="mb-1">*/}
                                {/*    <Form.Input*/}
                                {/*        type="file"*/}
                                {/*        id="inputGroupFile04"*/}
                                {/*        aria-describedby="inputGroupFileAddon04"*/}
                                {/*        aria-label="upload"*/}
                                {/*        name="MasterImage"*/}
                                {/*        accept=".webp"*/}
                                {/*        onChange={imageChange}*/}
                                {/*    />*/}
                                {/*</InputGroup>*/}
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
                    <ModalTitle>UPDATE NEWS</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            News Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)}  />
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
                    <th scope="col">NEWS TITLE</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {newsData.map((data, index) => {
                    console.log('print news data===>',newsData)
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            <th>
                                <img width={100} src={data.data.thumbnail_url} />
                            </th>
                            <th>{data.data.newsTitle}</th>

                            <th>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    onClick={() => edit(
                                        data.data.newsId,
                                        data.data.newsTitle,
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
                        <h2>NEWS LIST</h2>
                    </CardHeader>
                    <CardBody>{News()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
