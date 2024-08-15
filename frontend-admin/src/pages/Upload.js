import React, {useEffect, useState} from "react";
import {
    executeGetAuthor,
    executeGetBookSeries,
    executeGetCategory, executeGetContent,
    executeUpdateBookSeries,
    executeUploadContent
} from "../api/endPoints";
import ScreenLoading from "./Loading";
import {Col} from "reactstrap";
import {Button, Card, CardBody, CardHeader, FormLabel, FormSelect, Image, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Mp3Image from "../assets/mp3-file-format-symbol.png";
import PDFImage from "../assets/pdf-file.png";


const ContentData = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [authorData, setAuthorData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [bookSeriesData, setBookSeriesData] = useState([]);
    const [selecteBookSeries, setSelecteBookSeries] = useState('');
    const [selecteBookSeriesID, setSelecteBookSeriesID] = useState('');
    const [isBookSeries, setIsBookSeries] = useState(false);
    const [bookType, setBookType] = useState('');
    const [bookName, setBookName] = useState('');
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedFileImage, setSelectedFileImage] = useState('')
    const [selectedPreviewFileImage, setSelectedPreviewFileImage] = useState('')
    const [selectedFullFileImage, setSelectedFullFileImage] = useState('')
    const [bookPrice, setBookPrice] = useState(0)

    const [thumbnail, setThumbnail] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const [pdfFile, setPdfFile] = useState(null)
    const [previewPdfFile, setPreviewPdfFile] = useState(null)
    const [fullPdfFile, setFullPdfFile] = useState(null)

    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)

    const [chapter, setChapter] = useState(1)
    const [description, setDescription] = useState('')
    const [premium, setPremium] = useState(false)
    const [tags, setTags] = useState([])
    const [series, setSeriesData] = useState([])
    const [subcategoryData, setSubcategoryData] = useState([])
    const [qualityObj, setQualityObj] = useState({ '360p': '', '540p': '', '720p': '', '1080p': '' })
    const [seasonsNumber, setSeasonsNumber] = useState(1)
    const [nextSeason, setNextSeason] = useState('i')
    const [numberOfchapters, setNumberOfchapters] = useState(0)
    const [nextchapter, setNextchapter] = useState('i')
    const [booksData, setBooksData] = useState('i')

    // uploads
    const [progress, setProgress] = useState(0)

    const [subtitle, setSubtitle] = useState('')
    const [visible, setVisible] = useState(false)
    const [visibleSubtitle, setVisibleSubtitle] = useState(false)



    const getCategory = async () => {
        setLoading(true)
        const response = await executeGetCategory();
        const data = response.data;
        setCategoryData(data)
        setLoading(false)

    }

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
        console.log('print getBookserie===>',bookSeriesData);

    }

    const getBookContents = async () => {
        setLoading(true)
        const response = await executeGetContent();
        const data = response.data;
        setBooksData(data)
        setLoading(false)

    }

    useEffect(() => {
        getCategory()
        getAuthor()
        getBookSeries()
        getBookContents()
    }, [])

    const handleBookType = (e) => {
        console.log("value====>",e.target.value)
        setBookType(e.target.value)
        if(e.target.value == 'Audio Book'){
            setIsBookSeries(true)
        } else {setIsBookSeries(false)}
        // console.log('current chapter in book upload ===>', chapter);

    }

    const handleSeriesSelection = (seriesName, seriesId) => {
        setSelecteBookSeries(seriesName);
        setSelecteBookSeriesID(seriesId);

        // Calculate next chapter
        let nextChapter = 0;
        try {
            const filteredSeriesData = booksData.filter(item => item.data['seriesTitle'] === seriesName);
            let lastContentChapter = filteredSeriesData[filteredSeriesData.length - 1]['data']['chapter']
            nextChapter = lastContentChapter -1 + 2;
            console.log('lastContentChapter===>',lastContentChapter );
            console.log('filteredSeriesData===>',filteredSeriesData );
            console.log('filteredSeriesData length===>',filteredSeriesData.length );
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }

        // Update chapter state using callback
        setChapter(prevChapter => {
            const updatedChapter = nextChapter; // or any logic you need with prevChapter
            console.log('Current chapter:', nextChapter);
            return nextChapter;
        });
    };

    const validchapter = (chapterNum) => {
        console.log('inside of the validation chapter')
        let modifiedValue
        if (chapterNum <= 9) {
            modifiedValue = `0${chapterNum}`
            console.log('inside of the validation chapter if', chapterNum)
            setNextchapter(modifiedValue)
            console.log('inside of the validation chapter if modified', modifiedValue)
        } else {
            modifiedValue = `${chapterNum}`
            console.log('inside of the validation chapter else', modifiedValue)
            setNextchapter(modifiedValue)
        }
        return modifiedValue
    }
    // const setBookSeriesChapter = async (seriesName) => {
    //     let nextChapter = 0;
    //
    //     try {
    //         // Assuming booksData is an array of documents or similar structure
    //         const filteredSeriesData = booksData.filter(item => item.data['seriesTitle'] === seriesName);
    //
    //         if (filteredSeriesData.length === 0) {
    //             // If no series found, set chapter to 0 (or 1 as per your requirement)
    //             setChapter(0); // or setChapter(1);
    //         } else {
    //             // Calculate the next chapter
    //             nextChapter = filteredSeriesData.length + 1;
    //
    //             // Set the chapter to nextChapter
    //             setChapter(nextChapter);
    //             // Ensure this logs the correct chapter value
    //         }
    //         console.log('current chapter===>', chapter);
    //     } catch (error) {
    //         console.error('Error fetching or processing data:', error);
    //     }
    // };



    const uploadContent = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!categoryName || !authorName || !bookType || !bookName || !thumbnail || (!audioFile && !previewPdfFile && !fullPdfFile)) {
            alert("Please fill all required fields and upload the necessary files.");
            return;
        }
       if(bookType == 'Audio Book' && !selecteBookSeries){
          alert("Please enter book series");
          return;
        }


        setLoading(true);

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('authorName', authorName);
        formData.append('chapter', chapter);
        formData.append('bookType', bookType);
        formData.append('description', description);
        formData.append('bookPrice', bookPrice);
        formData.append('bookName', bookName);
        formData.append('selecteBookSeries', selecteBookSeries);
        formData.append('selecteBookSeriesID', selecteBookSeriesID);
        formData.append('thumbnail', thumbnail);

        if (bookType === "Audio Book") {
            formData.append('audioFile', audioFile);
        } else if (bookType === "PDF") {
            formData.append('previewPdfFile', previewPdfFile);
            formData.append('fullPdfFile', fullPdfFile);
        }

        try {
            console.log('form data===>', formData);
            const response = await executeUploadContent(formData);
            console.log('RES===>', response.ok);
            // console.log('Content uploaded successfully:', response.data);
            setLoading(false)
            if (response.ok == false) {
                alert(`An Error Occurred!! Couldn't Upload the content`)
            }
            else{
                alert('Content uploaded successfully!')
            }

            reset();
        } catch (error) {
            console.error('Error uploading content:', error);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };


    // const uploadContent = async (e) => {
    //     e.preventDefault();
    //
    //     // if ( !categoryName || !authorName || !bookType  || !bookPrice || !bookName) {
    //     //     alert("Author name and series title are required.");
    //     //     return;
    //     // }
    //     try {
    //         const data = await executeUploadContent(categoryName,authorName,chapter, bookType, description, bookPrice, bookName, selecteBookSeries, thumbnail, audioFile, pdfFile);
    //         console.log('Series updated successfully:', data);
    //         reset()
    //     } catch (error) {
    //         console.error('Error updating series:', error);
    //     }
    // }

    const reset = () => {
        setValidated(false)
        setNextchapter()
        setLoading(false)
        setCategoryName('')
        setBookName('')
        setChapter(0)
        setDescription('')


        setThumbnail(null)
        setSubtitle('')
        setSelectedImage(null)
        setPdfFile(null);
        setPreviewPdfFile(null);
        setFullPdfFile(null);
        setAudioFile(null);
    }

    // js tag generate
    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        e.preventDefault()
        e.stopPropagation()
        const value = e.target.value.toLowerCase()
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }



    const changeCheckbox = (value) => {
        setPremium(value)
    }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setThumbnail(file);
        }
    }

    const   mp3Change = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFileImage(Mp3Image);
            setAudioFile(file);
        }
    }

    const pdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFileImage(PDFImage);
            setPdfFile(file);
        }
    }

    const previewPdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedPreviewFileImage(PDFImage);
            setPreviewPdfFile(file);
        }
    }

    const fullPdfChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFullFileImage(PDFImage);
            setFullPdfFile(file);
        }
    }

    const handleClose = () => {
        setVisible(false)
        setSelectedImage(null)
    }

    if (loading) {
        return <ScreenLoading />
    }

    return (
        <>
          <Row>
              <Col md={4} className="position-relative">
                  <FormLabel htmlFor="validationTooltip04">Book Category</FormLabel>

                  <FormSelect
                      id="validationTooltip04"
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                  >
                      <option value="">Choose...</option>
                      {categoryData.map((item) => {
                          return (
                              <option key={item.data.id} value={item.data.categoryName}>
                                  {item.data.categoryName}
                              </option>
                          )
                      })}
                  </FormSelect>
              </Col>

              <Col md={4} className="position-relative">
                  <FormLabel>Author Name </FormLabel>
                  <FormSelect onChange={(e) => setAuthorName(e.target.value)}>
                      <option value="">Choose...</option>
                      {authorData.map((item) => {
                          return (
                              <option key={item.data.authorId} value={item.data.authorName}>
                                  {item.data.authorName}
                              </option>
                          )
                      })}
                  </FormSelect>
              </Col>

          </Row>
            <br/>
            <Row>
                <Col md={4} className="position-relative">
                    <FormLabel>Book Type</FormLabel>
                    <FormSelect onChange={handleBookType}>
                        <option value="">Choose...</option>
                        <option value="Audio Book"> Audio Book </option>
                        <option value="PDF"> E-Book </option>
                    </FormSelect>
                </Col>

                {isBookSeries == true ? (
                    <>
                    <Col md={4} className="position-relative">
                    <FormLabel htmlFor="validationTooltip04">
                    Select Book Series
                    </FormLabel>
                    <FormSelect
                    onClick={(e) => handleSeriesSelection(e.target.value, e.target.options[e.target.selectedIndex].getAttribute('data-series-id'))}
                    id="validationTooltip04"
                    required
                    >
                    <option value="">Choose...</option>
                {bookSeriesData.map((item) => (
                    <option key={item.data.seriesId} value={item.data.seriesTitle} data-series-id={item.data.seriesId}>
                {item.data.seriesTitle}
                    </option>
                    ))}
                    </FormSelect>
                    </Col>

                    </>) : null}
            </Row>
            <br/>
            <Row>
                <Col md={4} className="position-relative">
                    <FormLabel htmlFor="validationTooltip04">Book Name</FormLabel>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="name" placeholder="Enter name" onChange={(e) => setBookName(e.target.value)}  />
                    </Form.Group>

                </Col>
                {isBookSeries == false ?(
                <Col md={4} className="position-relative">
                    <FormLabel htmlFor="validationTooltip04">Book Price</FormLabel>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="name" placeholder="Enter price" onChange={(e) => setBookPrice(e.target.value)}  />
                    </Form.Group>

                </Col> ) : null}
            </Row>
            <Row className="mb-3">
                <Col sm={8}>
                    <FormLabel htmlFor="inputPassword" className="col-sm-4 col-form-label">
                        Description
                    </FormLabel>
                    {/*<Form.Text type="text" onChange={(e) => setDescription(e.target.value)} />*/}
                    <Form.Control as="textarea" aria-label="With textarea" onChange={(e) => setDescription(e.target.value)} />
                </Col>
            </Row>
            <br/>

            <Form
                className="row g-3 needs-validation form"
                noValidate
                validated={validated}
                onSubmit={uploadContent}
            >
                <Row className="mb-2">
                    <Col md={4}>
                    <Row><FormLabel>Upload Book Cover</FormLabel></Row>
                        {selectedImage ? (
                            <Row className="mb-3">
                                <Image  align="center" style={{ width: '200px', height: '200px' }}rounded src={selectedImage} />
                            </Row>
                        ) : null}
                    <Row className="position-relative">
                        <input type="file" onChange={imageChange} required />
                    </Row>

                    </Col>
                    <Col md={8}>
                        <Row><FormLabel>Upload Book</FormLabel></Row>
                        {bookType == "Audio Book" ? (
                            <>
                                <Row className="position-relative">
                                    <input type="file" accept=".mp3" onChange={mp3Change} required />
                                </Row>
                            </>
                        ) : bookType === "PDF" ? (
                            <>
                                {/*<Row className="mb-3">*/}
                                {/*    <Image align="center" style={{ width: '200px', height: '200px' }} rounded src={selectedFileImage} />*/}
                                {/*</Row>*/}
                                <Row className="position-relative">
                                    <Col md={4}>
                                        <FormLabel>Preview Book PDF File</FormLabel>
                                        {selectedPreviewFileImage ? (
                                            <Row className="mb-3">
                                                <Image align="center" style={{ width: '200px', height: '200px' }} rounded src={selectedPreviewFileImage} />
                                            </Row>):null}
                                        <input type="file" accept=".pdf" onChange={previewPdfChange} required />
                                    </Col>
                                    <Col md={4}>
                                        <FormLabel>Full Book PDF File</FormLabel>

                                        {selectedFullFileImage ? (
                                            <Row className="mb-3">
                                                <Image align="center" style={{ width: '200px', height: '200px' }} rounded src={selectedFullFileImage} />
                                            </Row>):null}
                                        <input type="file" accept=".pdf" onChange={fullPdfChange} required />
                                    </Col>
                                </Row>
                            </>
                        ) : null}
                    </Col>

                </Row>


                <Col xs={12} className="position-relative">
                    <Button color="success" type="submit">
                        Upload Now
                    </Button>
                </Col>
            </Form>
        </>
    )
}

const Index = () => {
    return (
        <Row>
            <Col>
                <Card className="mb-4" style={{marginRight:90, marginLeft:20}}>
                    <CardHeader>
                        <h3>BOOKS UPLOAD</h3>
                    </CardHeader>
                    <CardBody>{ContentData()}</CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Index
