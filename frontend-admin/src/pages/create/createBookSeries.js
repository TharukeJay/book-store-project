import {
    executeCreateAuthor,
    executeCreateBookSeries, executeDeleteBookSeries,
    executeGetAuthor,
    executeGetBookSeries,
    executeGetSelectedBookSeries, executeUpdateBookSeries
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


const Series = () => {

    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [bookSeriesData, setBookSeriesData] = useState([]);
    const [selecteBookSeriesData, setSelecteBookSeriesData] = useState([]);
    const [bookSeriesTitle, setBookSeriesTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [uploadNow, setUploadNow] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [seriesID, setSeriesID] = useState('')
    const [seriesPrice, setSeriesPrice] = useState('')


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



    const getAuthor = async () => {
        setLoading(true)
        const response = await executeGetAuthor();
        const data = response.data;
        setAuthorData(data)
        setLoading(false)

    }


    const getBookSeries = async () => {
        setLoading(true)
        const response = await executeGetBookSeries();
        const data = response.data;
        setBookSeriesData(data)
        setLoading(false)

    }

    // REACT JS - USE EFFECT FUNCTION
    useEffect(() => {
        getBookSeries()
        getAuthor()
    }, [])



    // firebase - store data into firebase collection
    const uploadMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!authorName || !bookSeriesTitle) {
            alert("Author name and series title are required.");
            setUploadNow(false);
            return;
        }

        const formData = new FormData();
        formData.append('authorName', authorName);
        formData.append('seriesTitle', bookSeriesTitle);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('seriesPrice', seriesPrice);

        try {
            const response = await executeCreateBookSeries(formData).then(function (response) {
                console.log(response.data);
                setUploadNow(false)
                setVisible(false)
                getBookSeries()
                alert('Series created Successfully')
            })
        } catch (error) {
            console.error("There was an error creating the book series:", error);
        }
    }

    const updateMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!authorName || !bookSeriesTitle) {
            alert("Author name and series title are required.");
            setUploadNow(false);
            return;
        }
        try {
            const data = await executeUpdateBookSeries(seriesID, authorName, bookSeriesTitle, description, thumbnail,seriesPrice);
            console.log('Series updated successfully:', data);
            getBookSeries();
            setEditVisible(false)
        } catch (error) {
            console.error('Error updating series:', error);
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

    const edit = async (id,seriesTitle,description,authorName, thumbnail_url,seriesPrice) => {
        if(id != ''){
            setSeriesID(id)
            setAuthorName(authorName)
            setDescription(description)
            setBookSeriesTitle(seriesTitle)
            setThumbnail(thumbnail_url)
            setEditVisible(true)
            setSeriesPrice(seriesPrice)
        }
    }

    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteBookSeries(seriesID);
            const data = response.data;
            setLoading(false);
            getBookSeries();
            setEditVisible(false)
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setAuthorName('')
        setVisible(false)
        setSelectedImage(null)
        // setHide(false)
        // setFeaturedContent(false)
        // setDisplayFeaturedContent('')
        setEditVisible(false)
    }


    const handleAddNew = () => {
        setAuthorName('')
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
                    <ModalTitle>Create Book Series</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Book Author
                        </FormLabel>
                        <Col md={8} className="position-relative">
                            <InputGroup className="mb-1">
                                <Form.Select
                                    id="validationTooltip04"
                                    name="series"
                                    onChange={(e) => {
                                        setAuthorName(e.target.options[e.target.selectedIndex].text)
                                        // setBookSeriesTitle(e.target.value)
                                        // setDescription(e.target.value)
                                    }}
                                    value={authorName}
                                >
                                    <option value="">Choose..</option>
                                    {console.log('authorData==>',authorData)}
                                    {authorData.map((item) => {
                                        return (
                                            <option key={item.data.id} value={item.id}>
                                                {item.data.authorName}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Book Series Title
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setBookSeriesTitle(e.target.value)}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Book Series Price
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" onChange={(e) => setSeriesPrice(e.target.value)}  />
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
                    <ModalTitle>UPDATE BOOK SERIES</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Author Name
                        </FormLabel>
                        <Col md={8} className="position-relative">
                            <InputGroup className="mb-1">
                                <FormSelect
                                    id="validationTooltip04"
                                    name="series"
                                    onChange={(e) => {
                                        setAuthorName(e.target.value)
                                    }}
                                    value={authorName}
                                >
                                    <option value="">Choose..</option>
                                    {authorData.map((item) => {
                                        return (
                                            <option key={item.data.id} value={item.data.id}>
                                                {item.data.authorName}
                                            </option>
                                        )
                                    })}
                                </FormSelect>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Book Series Title
                        </FormLabel>
                            <Col sm={8}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="name" placeholder="Enter name" value={bookSeriesTitle} onChange={(e) => setBookSeriesTitle(e.target.value)}  />
                                </Form.Group>
                            </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Book Series Price
                        </FormLabel>
                        <Col sm={8}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="name" placeholder="Enter name" value={seriesPrice} onChange={(e) => setSeriesPrice(e.target.value)}  />
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
                        <th scope="col">SERIES TITLE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {bookSeriesData.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <th scope="row">{index + 1}</th>
                                <th>
                                    <img width={100} src={data.data.thumbnail_url} />
                                </th>
                                <th>{data.data.seriesTitle}</th>

                                <th>
                                    <Button
                                        color="success"
                                        className="me-md-4"
                                        active
                                        tabIndex={-1}
                                        onClick={() => edit(
                                            data.data.seriesId,
                                            data.data.seriesTitle,
                                            data.data.description,
                                            data.data.authorName,
                                            data.data.thumbnail_url,
                                            data.data.seriesPrice,
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
                        <h2>BOOK SERIES LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
