
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
    executeDeleteBookSeries, executeDeleteContent,
    executeGetAuthor,
    executeGetBookSeries, executeGetCategory,
    executeGetContent,
    executeUpdateBookSeries, executeUpdateContent
} from "../api/endPoints";
import ScreenLoading from "./Loading";
import PDFImage from "../assets/pdf-file.png";


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
    const [price, setPrice] = useState('')
    const [previewPdfFile, setPreviewPdfFile] = useState(null)
    const [previewPdfFileName, setPreviewPdfFileName] = useState('')
    const [fullPdfFile, setFullPdfFile] = useState(null)
    const [fullPdfFileName, setFullPdfFileName] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    const [bookType, setBookType] = useState('PDF')

    const [categoryData, setCategoryData] = useState([]);
    const [editVisible, setEditVisible] = useState(false)
    const [subcategory, setSubcategory] = useState()
    const [editId, setEditId] = useState()




    const getAuthor = async () => {
        setLoading(true)
        const response = await executeGetAuthor();
        const data = response.data;
        setAuthorData(data)
        setLoading(false)

    }
    const getCategory = async () => {
        setLoading(true)
        const response = await executeGetCategory();
        const data = response.data;
        setCategoryData(data)
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
        getCategory()
        getAuthor()
    }, [])


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

    const Delete = async () => {
        setLoading(true);
        try {
            const response = await executeDeleteContent(id);
            const data = response.data;
            setLoading(false);
            setEditVisible(false)
            alert('Content deleted successfully!')
            getBookSeries();

        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setVisible(false)
        setEditVisible(false)
    }

    const updateMedia = async (e) => {
        e.preventDefault();

        if (!category || !authorName || !bookType || !title || !thumbnail) {
            alert("Please fill all required fields and upload the necessary files.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('categoryName', category);
        formData.append('authorName', authorName);
        formData.append('bookType', bookType);
        formData.append('description', description);
        formData.append('bookPrice', price);
        formData.append('bookName', title);
        formData.append('thumbnail', thumbnail);
        formData.append('previewPdfFile', previewPdfFile);
        formData.append('fullPdfFile', fullPdfFile);
        formData.append('id', id);

        try {
            console.log('form data===>', formData);
            const response = await executeUpdateContent(formData);
            console.log('Content uploaded successfully:', response.data);
            alert('Content uploaded successfully!')
            setEditVisible(false)
        } catch (error) {
            console.error('Error uploading content:', error);
        } finally {
            setLoading(false);
        }
    }
    const previewPdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPreviewPdfFile(file);
        }
    }

    const fullPdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFullPdfFile(file);
        }
    }


    const edit = async (category,authorName,title,price,description,bookFile_url,thumbnail_url,id) => {
        if(id != ''){
            console.log('print bookfile url===>',bookFile_url['fullBookUrl'])
            setCategory(category)
            setAuthorName(authorName)
            setTitle(title)
            setPrice (price)
            setDescription(description)
            setFullPdfFile(bookFile_url['fullBookUrl'])
            setPreviewPdfFile(bookFile_url['bookPreviewUrl'])
            setThumbnail(thumbnail_url)
            setEditVisible(true)
            setFullPdfFileName(bookFile_url['fullBookName'])
            setPreviewPdfFileName(bookFile_url['bookPreviewName'])
            setId(id)
        }
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
            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>UPDATE PDF BOOK</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-3">
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Book name
                        </FormLabel>
                        <Col sm={8}>

                            <Form.Control as="textarea" aria-label="With textarea" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <FormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                            Category
                        </FormLabel>
                        <Col md={8} className="position-relative">
                            <InputGroup className="mb-1">
                                <FormSelect
                                    id="validationTooltip04"
                                    name="series"
                                    onChange={(e) => {
                                        setCategory(e.target.value)
                                    }}
                                    value={category}
                                >
                                    <option value="">Choose..</option>
                                    {categoryData.map((item) => {
                                        return (
                                            <option key={item.data.id} value={item.data.id}>
                                                {item.data.categoryName}
                                            </option>
                                        )
                                    })}
                                </FormSelect>
                            </InputGroup>
                        </Col>
                    </Row>
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
                        {/*<Row><FormLabel>Upload Book</FormLabel></Row>*/}

                        {/*        <Row className="position-relative">*/}
                        {/*            <input type="file" accept=".mp3" onChange={mp3Change} required />*/}
                        {/*        </Row>*/}
                        <Row className="mb-3">
                            <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                                PDF File
                            </FormLabel>
                        </Row>
                        <Row className="position-relative">
                            <Col md={8}>
                                <FormLabel>Preview Book PDF File : {previewPdfFileName ? previewPdfFileName : 'N/A'}</FormLabel>
                                <input type="file" accept=".pdf" onChange={previewPdfChange}  />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <FormLabel>Full Book PDF File : {fullPdfFileName ? fullPdfFileName : 'N/A'}</FormLabel>
                                <input type="file" accept=".pdf" onChange={fullPdfChange}  />
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
                                    onClick={() => edit(
                                        data.data.category,
                                        data.data.authorName,
                                        data.data.title,
                                        data.data.price,
                                        data.data.description,
                                        data.data.bookFile_url,
                                        data.data.thumbnail_url,
                                        data.data.id,
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
                        <h2>PDF BOOKS LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
