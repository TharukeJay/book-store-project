
import React, {useEffect, useState} from "react";

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
import {
    executeDeleteBookSeries,
    executeGetAuthor,
    executeGetBookSeries,
    executeGetContent,
    executeUpdateBookSeries
} from "../api/endPoints";
import ScreenLoading from "./Loading";


const Series = () => {

    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [bookSeriesData, setBookSeriesData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [bookSeriesTitle, setBookSeriesTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [uploadNow, setUploadNow] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [seriesID, setSeriesID] = useState('')


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

    const getBookContents = async () => {
        setLoading(true)
        const response = await executeGetContent();
        const data = response.data;
        setBooksData(data)
        setLoading(false)

    }

    // REACT JS - USE EFFECT FUNCTION
    useEffect(() => {
        getBookContents()
    }, [])


    const updateMedia = async (e) => {

        setUploadNow(true)
        e.preventDefault();

        if (!authorName || !bookSeriesTitle) {
            alert("Author name and series title are required.");
            setUploadNow(false);
            return;
        }
        try {
            const data = await executeUpdateBookSeries(seriesID, authorName, bookSeriesTitle, description, thumbnail);
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

    const edit = async (id,seriesTitle,description,authorName, thumbnail_url,) => {
        if(id != ''){
            setSeriesID(id)
            setAuthorName(authorName)
            setDescription(description)
            setBookSeriesTitle(seriesTitle)
            setThumbnail(thumbnail_url)
            setEditVisible(true)
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

            {/*<Modal alignment="center" show={editVisible} onClose={() => handleClose()}>*/}
            {/*    <ModalHeader closeButton onClick={handleClose}>*/}
            {/*        <ModalTitle>UPDATE BOOK SERIES</ModalTitle>*/}
            {/*    </ModalHeader>*/}
            {/*    <ModalBody>*/}
            {/*        <Row className="mb-3">*/}
            {/*            <FormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">*/}
            {/*                Author Name*/}
            {/*            </FormLabel>*/}
            {/*            <Col md={8} className="position-relative">*/}
            {/*                <InputGroup className="mb-1">*/}
            {/*                    <FormSelect*/}
            {/*                        id="validationTooltip04"*/}
            {/*                        name="series"*/}
            {/*                        onChange={(e) => {*/}
            {/*                            setAuthorName(e.target.value)*/}
            {/*                        }}*/}
            {/*                        value={authorName}*/}
            {/*                    >*/}
            {/*                        <option value="">Choose..</option>*/}
            {/*                        {authorData.map((item) => {*/}
            {/*                            return (*/}
            {/*                                <option key={item.data.id} value={item.data.id}>*/}
            {/*                                    {item.data.authorName}*/}
            {/*                                </option>*/}
            {/*                            )*/}
            {/*                        })}*/}
            {/*                    </FormSelect>*/}
            {/*                </InputGroup>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row className="mb-3">*/}
            {/*            <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">*/}
            {/*                Book Series Title*/}
            {/*            </FormLabel>*/}
            {/*            <Col sm={8}>*/}
            {/*                <Form.Group className="mb-3" controlId="formBasicEmail">*/}
            {/*                    <Form.Control type="name" placeholder="Enter name" value={bookSeriesTitle} onChange={(e) => setBookSeriesTitle(e.target.value)}  />*/}
            {/*                </Form.Group>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}

            {/*        <Row className="mb-3">*/}
            {/*            <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">*/}
            {/*                Description*/}
            {/*            </FormLabel>*/}
            {/*            <Col sm={8}>*/}
            {/*                /!*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*!/*/}
            {/*                <Form.Control as="textarea" aria-label="With textarea" value={description} onChange={(e) => setDescription(e.target.value)} />*/}
            {/*            </Col>*/}
            {/*        </Row>*/}

            {/*        {selectedImage ? (*/}
            {/*            <Row className="mb-3">*/}
            {/*                <Image align="center" rounded src={selectedImage} />*/}
            {/*            </Row>*/}
            {/*        ) : (<Row className="mb-3">*/}
            {/*            <Image  align="center" rounded src={thumbnail} />*/}
            {/*        </Row>)}*/}

            {/*        <form onSubmit={updateMedia}>*/}
            {/*            <Row className="mb-2">*/}
            {/*                <Col md={12} className="position-relative">*/}
            {/*                    <input type="file" onChange={imageChangeUpdate}  />*/}
            {/*                </Col>*/}
            {/*            </Row>*/}

            {/*            <div className="row justify-content-md-center">*/}
            {/*                <Col xs lg={9}>*/}
            {/*                    <Button type="submit" color="primary" variant="outline" id="inputGroupFileAddon04">*/}
            {/*                        UPDATE*/}
            {/*                    </Button>*/}
            {/*                </Col>*/}

            {/*                <Col>*/}
            {/*                    <Button color="danger" onClick={() => Delete()}>*/}
            {/*                        DELETE*/}
            {/*                    </Button>*/}
            {/*                </Col>*/}
            {/*            </div>*/}
            {/*        </form>*/}
            {/*    </ModalBody>*/}
            {/*</Modal>*/}

            {/* react - Table sub categories list */}
            <Table>
                <thead color="light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">COVER PAGE</th>
                    <th scope="col">BOOK NAME</th>
                    <th scope="col">AUTHOR</th>
                    <th scope="col">PRICE (LKR)</th>
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {booksData.filter(data => data.data.isSeries === false).map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            <th>
                                <img width={100} src={data.data.thumbnail_url} />
                            </th>
                            <th>{data.data.title}</th>
                            <th>{data.data.authorName}</th>
                            <th>{data.data.price}</th>

                            <th>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    // onClick={() => edit(
                                    //     data.data.seriesId,
                                    //     data.data.seriesTitle,
                                    //     data.data.description,
                                    //     data.data.authorName,
                                    //     data.data.thumbnail_url,
                                    // )}
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
                        <h2>PDF BOOKS LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
