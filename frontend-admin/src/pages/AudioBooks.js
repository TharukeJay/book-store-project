
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
    executeUpdateBookSeries, executeUpdateContent, executeUploadContent
} from "../api/endPoints";
import ScreenLoading from "./Loading";
import Mp3Image from "../assets/mp3-file-format-symbol.png";


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
    const [seriesId, setSeriesId] = useState('')
    const [category, setCategory] = useState('')
    const [seriesTitle, setSeriesTitle] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [editVisible, setEditVisible] = useState(false)
    const [categoryData, setCategoryData] = useState([]);
    const [selectedFileImage, setSelectedFileImage] = useState('')
    const [audioFile, setAudioFile] = useState(null)
    const [audioFileName, setAudioFileName] = useState(null)
    const [chapter, setChapter] = useState(1)
    const [bookType, setBookType] = useState('Audio Book')
    const [id, setId] = useState('')
    const [selectedSeriesTitle, setSlectedSeriesTitle] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    const incrementChapter = () => {

        setChapter(prevChapter => (prevChapter -1 +2));
    };

    const decrementChapter = () => {
        if (chapter > 1) {
            setChapter(prevChapter => prevChapter - 1);
        }
    };

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
        getAuthor()
        getCategory()
        getBookSeries()
    }, [])


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
            formData.append('chapter', chapter);
            formData.append('bookType', bookType);
            formData.append('description', description);
            formData.append('bookPrice', price);
            formData.append('bookName', title);
            formData.append('selecteBookSeries', seriesTitle);
            formData.append('selecteBookSeriesID', seriesId);
            formData.append('thumbnail', thumbnail);
            formData.append('audioFile', audioFile);
            formData.append('id', id);

            try {
                console.log('form data===>', formData);
                const response = await executeUpdateContent(formData);
                console.log('Content uploaded successfully:', response.data);
                alert('Content uploaded successfully!')
                setEditVisible(false)
                getBookContents()
            } catch (error) {
                console.error('Error uploading content:', error);
            } finally {
                setLoading(false);
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

    const edit = async (category,authorName,seriesId,seriesTitle,title,price,description,bookFile_url, thumbnail_url,id,chapter) => {
        if(seriesId != ''){
            console.log('print bookfile url===>',bookFile_url['fullBookUrl'])
            setCategory(category)
            setAuthorName(authorName)
            setSeriesId(seriesId)
            setSeriesTitle(seriesTitle)
            setTitle(title)
            setPrice (price)
            setDescription(description)
            setAudioFile(bookFile_url['fullBookUrl'])
            setThumbnail(thumbnail_url)
            setEditVisible(true)
            setAudioFileName(bookFile_url['fullBookName'])
            setId(id)
            setChapter(chapter)
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
            getBookContents();
        } catch (error) {
            setLoading(false);
            console.error('Error creating author:', error);
        }
    }

    const handleClose = () => {
        setAuthorName('')
        setVisible(false)
        setSelectedImage(null)
        setEditVisible(false)
    }

    const handleChangeSeries = (event) => {
        const { name, value } = event.target
        setBookSeriesTitle(event.target.value);
    }

    const mp3Change = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFileImage(Mp3Image);
            setAudioFile(file);
        }
    }

    const handleAddNew = () => {
        setAuthorName('')
        setVisible(!visible)
    }

    const filteredBooks = booksData.filter(data =>
        data.data.isSeries === true && data.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <ScreenLoading />
    }


    return (
        <>

            <Modal alignment="center" show={editVisible} onClose={() => handleClose()}>
                <ModalHeader closeButton onClick={handleClose}>
                    <ModalTitle>UPDATE AUDIO BOOK</ModalTitle>
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
                        <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                            Chapter
                      </FormLabel>
                        <Col sm={8}>
                            <div className="d-flex align-items-center">
                                <Button variant="outline-secondary" onClick={decrementChapter}>-</Button>
                                <Form.Control
                                    type="text"
                                    value={chapter}
                                    readOnly
                                    className="mx-2"
                                    style={{ width: '50px', textAlign: 'center' }}
                                />
                                <Button variant="outline-secondary" onClick={incrementChapter}>+</Button>
                            </div>
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
                            Book Series Title
                        </FormLabel>
                        <Col sm={8}>
                            {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                            <Form.Control as="textarea" aria-label="With textarea" value={seriesTitle} onChange={(e) => setSeriesTitle(e.target.value)} />
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
                                Audio File
                            </FormLabel>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                {audioFileName ? audioFileName : ''}
                                <Form.Control
                                    type="file"
                                    accept="audio/*"
                                    onChange={mp3Change}
                                />
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
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search by book title..."
                        style={{color:"green"}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>
            {/* react - Table sub categories list */}
            <Table>
                <thead color="light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">COVER PAGE</th>
                    <th scope="col">BOOK NAME</th>
                    <th scope="col">BOOK SERIES NAME</th>
                    <th scope="col">CHAPTER</th>
                    <th scope="col">AUTHOR</th>
                    {/*<th scope="col">PRICE (LKR)</th>*/}
                    <th scope="col">ACTION</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((data, index) => {
                    return (
                        <tr key={data.id}>
                            <th scope="row">{index + 1}</th>
                            <th>
                                <img width={100} src={data.data.thumbnail_url} />
                            </th>
                            <th>{data.data.title}</th>
                            <th>{data.data.seriesTitle}</th>
                            <th>{data.data.chapter}</th>
                            <th>{data.data.authorName}</th>
                            {/*<th>{data.data.price}</th>*/}

                            <th>
                                <Button
                                    color="success"
                                    className="me-md-4"
                                    active
                                    tabIndex={-1}
                                    onClick={() => edit(
                                        data.data.category,
                                        data.data.authorName,
                                        data.data.seriesId,
                                        data.data.seriesTitle,
                                        data.data.title,
                                        data.data.price,
                                        data.data.description,
                                        data.data.bookFile_url,
                                        data.data.thumbnail_url,
                                        data.data.id,
                                        data.data.chapter,
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
                <Card className="mb-4"style={{marginRight:90, marginLeft:20}}>
                    <CardHeader>
                        <h2>AUDIO BOOKS LIST</h2>
                    </CardHeader>
                    <CardBody>{Series()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
