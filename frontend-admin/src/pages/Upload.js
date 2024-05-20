// // import React, { useState } from 'react';
// // import TopNavbar from "./nav_bars/Top_nav_bar";
// // import SideNavbar from "./nav_bars/Side_nav_bar";
// // import { Form, FormGroup, Button } from 'react-bootstrap';
// //
// //
// // function Home() {
// //     const [category, setCategory] = useState('');
// //     const [type, setType] = useState('');
// //     const [title, setTitle] = useState('');
// //     const [author, setAuthor] = useState('');
// //     const [price, setPrice] = useState('');
// //     const [description, setDescription] = useState('');
// //
// //     const handleCategoryChange = (event) => {
// //         setCategory(event.target.value);
// //     };
// //
// //     const handleTypeChange = (event) => {
// //         setType(event.target.value);
// //     };
// //
// //     const handleTitleChange = (event) => {
// //         setTitle(event.target.value);
// //     };
// //
// //     const handleAuthorChange = (event) => {
// //         setAuthor(event.target.value);
// //     };
// //
// //     const handlePriceChange = (event) => {
// //         setPrice(event.target.value);
// //     };
// //
// //     const handleDescriptionChange = (event) => {
// //         setDescription(event.target.value);
// //     };
// //
// //     return (
// //         <div>
// //             <div style={{ display:"flex", marginLeft:20}}>
// //                 {/*<SideNavbar />*/}
// //                 <div style={{ marginLeft: '20px' }}>
// //                     <h2>BOOKS UPLOAD</h2>
// //                     <p>Welcome to the Home Page!</p>
// //                     <Form>
// //                         <FormGroup>
// //                             <Form.Label>Select Category:</Form.Label>
// //                             <Form.Control as="select" value={category} onChange={handleCategoryChange}>
// //                                 {/* Add options for categories */}
// //                             </Form.Control>
// //                         </FormGroup>
// //                         <FormGroup>
// //                             <Form.Label>Select book Type:</Form.Label>
// //                             <Form.Control as="select" value={type} onChange={handleTypeChange}>
// //                                 <option value={''}>select book</option>
// //                                 <option value={'PDF'}>PDF</option>
// //                                 <option value={'audioBook'}>Audio book</option>
// //                             </Form.Control>
// //                         </FormGroup>
// //                         <FormGroup>
// //                             <Form.Label>Title:</Form.Label>
// //                             <Form.Control type="text" value={title} onChange={handleTitleChange} />
// //                         </FormGroup>
// //                         <FormGroup>
// //                             <Form.Label>Select Author:</Form.Label>
// //                             <Form.Control as="select" value={author} onChange={handleAuthorChange}>
// //                                 {/* Add options for authors */}
// //                             </Form.Control>
// //                         </FormGroup>
// //                         <FormGroup>
// //                             <Form.Label>Book Price:</Form.Label>
// //                             <Form.Control type="text" value={price} onChange={handlePriceChange} />
// //                         </FormGroup>
// //                         <FormGroup>
// //                             <Form.Label>Description:</Form.Label>
// //                             <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
// //                         </FormGroup>
// //                         <Button variant="primary">Upload</Button>
// //                     </Form>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// //
// // export default Home;
//
//
//
// import {useState} from "react";
// import {executeCreateCategory, executeGetCategory} from "../api/endPoints";
// import Loading from "react-loading";
//
// const ContentData = () => {
//     const [validated, setValidated] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [category, setCategory] = useState('')
//     const [categoryData, setCategoryData] = useState([])
//     const [authorData, setAuthorData] = useState([])
//     const [author, setAuthor] = useState('')
//
//
//
//
//
//     // uploads
//     const [progress, setProgress] = useState(0)
//     const [thumbnail, setThumbnail] = useState()
//     const [subtitle, setSubtitle] = useState('')
//     const [visible, setVisible] = useState(false)
//     const [visibleSubtitle, setVisibleSubtitle] = useState(false)
//     const [audio, setAudio] = useState('')
//     const [visibleAudio, setVisibleAudio] = useState(false)
//     const [musicAudio, setMusicAudio] = useState('')
//     const [visibleMusicAudio, setVisibleMusicAudio] = useState(false)
//
//
//     }
//
//
//
// const getCategory = async () => {
//     setLoading(true)
//     const response = await executeGetCategory();
//     const data = response.data;
//     setCategoryData(data)
//     setLoading(false)
//
// }
//
//
//     const setSeasonValue = (value) => {
//         setSeasonsNumber(value)
//     }
//
//     const setEpisodeValue = (value) => {
//         setEpisode(value)
//     }
//
//
//
//     // firebase get sub category
//     const getSubcategoryList = async () => {
//         let q = query(collection(db, 'subcategory'))
//         const data = await getDocs(q).then(function (data) {
//             setSubcategoryData(
//                 data.docs.map((doc) => ({
//                     ...doc.data(),
//                     id: doc.id,
//                 })),
//             )
//         })
//     }
//
//     // firebase get contentProvider
//     const getContentProvider = async () => {
//         let q = query(collection(db, 'contentProvider'))
//         const data = await getDocs(q).then(function (data) {
//             setContentProviderData(
//                 data.docs.map((doc) => ({
//                     ...doc.data(),
//                     id: doc.id,
//                 })),
//             )
//         })
//     }
//
//     useEffect(() => {
//         getSeries()
//         getCategory()
//         getSubcategoryList()
//         //getContentProviderList()
//         getPodcastSeries()
//         getTravelSeries()
//         getRealityShowsSeries()
//         getDiscussionsSeries()
//         getCookerySeries()
//         getContentProvider()
//         getMusicVideoSeries()
//     }, [])
//
//     const HandleSubmit = (event) => {
//         const form = event.currentTarget
//         if (form.checkValidity() === false) {
//             event.preventDefault()
//             event.stopPropagation()
//         }
//         setValidated(true)
//         if (category === 'Teledrama') {
//             setSeriesNextSeasonAndEpisode()
//         } else if (category === 'Podcast') {
//             setPodcastSeriesEpisode()
//         } else if (category === 'Travel') {
//             setTravelSeriesEpisode()
//             console.log('Inside travel series episode')
//         } else if (category === 'Cookery') {
//             setCookerySeriesEpisode()
//             console.log('Inside cookery series episode')
//         } else if (category === 'Discussions') {
//             setDiscussionsSeriesEpisode()
//             console.log('Inside discussions series episode')
//         } else if (category === 'Reality Shows') {
//             setRealityShowsSeriesEpisode()
//             console.log('Inside reality shows series episode')
//         } else {
//             StoreData(1, 1)
//         }
//
//         // StoreData()
//     }
//
//     //react image upload
//     const handleThumbnailUpload = async (e) => {
//         e.preventDefault()
//         const file = e.target[0]?.files[0]
//         if (!file) return
//
//         //const storageRef = ref(storage, `thumbnail/${file.name}`)
//         const storageRef = ref(storage, `thumbnail`)
//         const listResult = await listAll(storageRef)
//
//         const fileExists = listResult.items.some((item) => item.name === file.name)
//
//         if (fileExists) {
//             alert('A file with the same name already exists.')
//             return
//         }
//         if (thumbnail && thumbnail !== thumbnailImage) {
//             const existingFileRef = ref(storage, thumbnail)
//             await deleteObject(existingFileRef)
//         }
//         const uploadTask = uploadBytesResumable(ref(storage, `thumbnail/${file.name}`), file)
//         //const uploadTask = uploadBytesResumable(storageRef, file)
//
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progressData = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//                 setProgress(progressData)
//             },
//             (error) => {
//                 alert(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setThumbnail(downloadURL)
//                     setProgress(0)
//                     setVisible(false)
//                 })
//             },
//         )
//     }
//     //react audio file upload
//
//     const handleUploadAudio = async (e) => {
//         e.preventDefault()
//         const file = e.target[0]?.files[0]
//         if (!file) return
//
//         //const storageRef = ref(storage, `audio/podcast/${file.name}`)
//
//         const storageRef = ref(storage, 'audio/podcast')
//
//         const listResult = await listAll(storageRef)
//
//         const fileExists = listResult.items.some((item) => item.name === file.name)
//
//         if (fileExists) {
//             alert('A file with the same name already exists.')
//             return
//         }
//         const uploadTask = uploadBytesResumable(ref(storage, `audio/podcast/${file.name}`), file)
//         //const uploadTask = uploadBytesResumable(storageRef, file)
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progressData = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//                 setProgress(progressData)
//             },
//             (error) => {
//                 alert(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setAudio(downloadURL)
//                     setProgress(0)
//                     setUploadedAudio(file.name)
//                     setVisibleAudio(false)
//                 })
//             },
//         )
//     }
//
//     const handleUploadMusicAudio = async (e) => {
//         e.preventDefault()
//         const file = e.target[0]?.files[0]
//         if (!file) return
//
//         const storageRef = ref(storage, 'audio/music')
//
//         const listResult = await listAll(storageRef)
//
//         const fileExists = listResult.items.some((item) => item.name === file.name)
//
//         if (fileExists) {
//             alert('A file with the same name already exists.')
//             return
//         }
//
//         // Continue with upload if the file is not a duplicate
//         const uploadTask = uploadBytesResumable(ref(storage, `audio/music/${file.name}`), file)
//
//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const progressData = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//                 setProgress(progressData)
//             },
//             (error) => {
//                 alert(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setMusicAudio(downloadURL)
//                     setProgress(0)
//                     setUploadedMusicAudio(file.name)
//                     setVisibleMusicAudio(false)
//                 })
//             },
//         )
//     }
//
//
//     const reset = () => {
//         // setValidated(false)
//
//     }
//
//
//
//     const changeCheckbox = (value) => {
//         setPremium(value)
//     }
//     const changeCheckboxForMusicVideoSeries = (value) => {
//         setIsMusicVideoSeries(value)
//     }
//
//     const changeCheckboxForNoAdultContent = (value) => {
//         setNoAdultContent(value)
//     }
//
//     const imageChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedImage(URL.createObjectURL(e.target.files[0]))
//         }
//     }
//     const audioChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedAudio(URL.createObjectURL(e.target.files[0]))
//         }
//     }
//     const musicAudioChange = (e) => {
//         if (e.target.files && e.target.files.length > 0) {
//             setSelectedMusicAudio(URL.createObjectURL(e.target.files[0]))
//         }
//     }
//     const handleClose = () => {
//         setVisible(false)
//         setSelectedImage(null)
//         setVisibleAudio(false)
//         setSelectedAudio(null)
//         setVisibleMusicAudio(false)
//         setSelectedMusicAudio(null)
//     }
//
//
//     if (loading) {
//         return <Loading />
//     }
//
//     return (
//         <>
//             {/* mui category */}
//             <Col md={4} className="position-relative">
//                 <FormLabel htmlFor="validationTooltip04"> Category</FormLabel>
//
//                 <FormSelect
//                     id="validationTooltip04"
//                     onChange={(e) => {
//                         setCategory(e.target.value)
//                         const selectedCategory = categoryData.find((item) => item.name === e.target.value)
//                         setCategoryID(selectedCategory.id)
//                         console.log('Category ID ====>', categoryID)
//                     }}
//                     required
//                 >
//                     <option value="">Choose...</option>
//                     {categoryData.map((item) => {
//                         return (
//                             <option key={item.id} value={item.name}>
//                                 {item.name}
//                             </option>
//                         )
//                     })}
//                 </FormSelect>
//                 <CFormFeedback tooltip invalid>
//                     Please select Category.
//                 </CFormFeedback>
//             </Col>
//             {category == 'Music' ? (
//                 <>
//                     {/* mui subcategory */}
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel>Music Type</CFormLabel>
//                         <CFormSelect onChange={(e) => setMusicType(e.target.value)}>
//                             <option value="">Choose...</option>
//                             <option value="Video"> Video </option>
//                             <option value="Audio"> Audio </option>
//                         </CFormSelect>
//                     </CCol>
//                 </>
//             ) : null}
//             {/* mui contentProvider */}
//             {category != 'Teledrama' ? (
//                 <CCol md={4} className="position-relative">
//                     <CFormLabel>Content Provider</CFormLabel>
//                     <CInputGroup className="mb-1">
//                         <CFormSelect
//                             id="validationTooltip04"
//                             name="series"
//                             onChange={(e) => {
//                                 setContentProvider(e.target.value)
//                                 setSubcategory(e.target.value)
//                                 setContentProviderTitle(e.target.options[e.target.selectedIndex].text)
//                             }}
//                             value={contentProvider}
//                         >
//                             <option value="">Choose..</option>
//                             {contentProviderData.map((item) => {
//                                 return (
//                                     <option key={item.id} value={item.id}>
//                                         {item.title}
//                                     </option>
//                                 )
//                             })}
//                         </CFormSelect>
//                     </CInputGroup>
//                 </CCol>
//             ) : (
//                 <CCol md={4} className="position-relative">
//                     <CFormLabel>Content Provider</CFormLabel>
//                     <CInputGroup className="mb-1">
//                         <CFormSelect
//                             id="validationTooltip04"
//                             name="series"
//                             onChange={(e) => {
//                                 setContentProvider(e.target.value)
//                                 // setSubcategory(e.target.value)
//                                 setContentProviderTitle(e.target.options[e.target.selectedIndex].text)
//                                 teledramaSubcategory(e.target.options[e.target.selectedIndex].text)
//                                 console.log('testing content provider sub:', subcategory)
//                             }}
//                             value={contentProvider}
//                         >
//                             <option value="">Choose..</option>
//                             {contentProviderData.map((item) => {
//                                 return (
//                                     <option key={item.id} value={item.id}>
//                                         {item.title}
//                                     </option>
//                                 )
//                             })}
//                         </CFormSelect>
//                     </CInputGroup>
//                 </CCol>
//             )}
//             {category != 'Teledrama' ? (
//                 <>
//                     {/* mui subcategory */}
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel>Subcategory</CFormLabel>
//                         <CFormSelect onChange={(e) => setSubcategory(e.target.value)}>
//                             <option value="">Choose...</option>
//                             {subcategoryData.map((item) => {
//                                 if (item.category === category) {
//                                     return (
//                                         <option key={item.id} value={item.name}>
//                                             {item.name}
//                                         </option>
//                                     )
//                                 }
//                             })}
//                         </CFormSelect>
//                     </CCol>
//                 </>
//             ) : null}
//             {/* mui subcategory */}
//             <CCol md={4} className="position-relative">
//                 <CFormLabel>Language</CFormLabel>
//                 <CFormSelect onChange={(e) => setLanguage(e.target.value)}>
//                     <option value="">Choose...</option>
//                     <option value="sinhala"> Sinhalese </option>
//                     <option value="tamil"> Tamil </option>
//                     <option value="english"> English </option>
//                 </CFormSelect>
//             </CCol>
//             {category == 'Teledrama' ? (
//                 <>
//                     {/* mui name */}
//                     {
//                         <CCol md={4} className="position-relative">
//                             <CFormLabel htmlFor="validationTooltip04">
//                                 {category === 'Teledrama' ? `Series Name` : `Title`}
//                             </CFormLabel>
//                             <CFormSelect
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 // onSelect={(e) => setSeriesNextSeasonAndEpisode()}
//                                 id="validationTooltip04"
//                                 required
//                             >
//                                 <option value="">Choose...</option>
//                                 {series.map((item) => {
//                                     if (item.subcategory === subcategory) {
//                                         return (
//                                             <option key={item.id} value={item.title}>
//                                                 {item.title}
//                                             </option>
//                                         )
//                                     }
//                                 })}
//                             </CFormSelect>
//                             <CFormFeedback tooltip invalid>
//                                 Please select title.
//                             </CFormFeedback>
//                         </CCol>
//                     }
//                 </>
//             ) : category == 'Podcast' ? (
//                 <>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Podcast Series Name</CFormLabel>
//                         <CFormSelect
//                             onChange={(e) => setPodcastSeriesName(e.target.value)}
//                             // onSelect={(e) => setSeriesNextSeasonAndEpisode()}
//                             id="validationTooltip04"
//                             required
//                         >
//                             <option value="">Choose...</option>
//                             {podcastSeries.map((item) => {
//                                 if (item.subcategory === subcategory) {
//                                     return (
//                                         <option key={item.id} value={item.title}>
//                                             {item.title}
//                                         </option>
//                                     )
//                                 }
//                             })}
//                         </CFormSelect>
//                         <CFormFeedback tooltip invalid>
//                             Please select series name.
//                         </CFormFeedback>
//                     </CCol>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                         <CFormInput
//                             onChange={(e) => setTitleForPodcast(e.target.value)}
//                             id="validationTooltip04"
//                             required
//                             type="text"
//                         />
//                         <CFormFeedback tooltip invalid>
//                             Please select title.
//                         </CFormFeedback>
//                     </CCol>
//                 </>
//             ) : category == 'Travel' ? (
//                 <>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Travel Series Name</CFormLabel>
//                         <CFormSelect
//                             onChange={(e) => {
//                                 setTravelSeriesName(e.target.value)
//                                 const selectedTravelSeries = travelSeries.find(
//                                     (item) => item.title === e.target.value,
//                                 )
//                                 if (selectedTravelSeries) {
//                                     setTravelSeriesID(selectedTravelSeries.id)
//                                     console.log('Category ID ====>', selectedTravelSeries.id)
//                                 } else {
//                                     console.log('Selected travel series not found.')
//                                     setTravelSeriesID('')
//                                 }
//                             }}
//                             id="validationTooltip04"
//                             required
//                         >
//                             <option value="">Choose...</option>
//                             {travelSeries.map((item) => {
//                                 // if (item.subcategory === subcategory) {
//                                 return (
//                                     <option key={item.id} value={item.title}>
//                                         {item.title}
//                                     </option>
//                                 )
//                                 // }
//                             })}
//                         </CFormSelect>
//                         <CFormFeedback tooltip invalid>
//                             Please select series name.
//                         </CFormFeedback>
//                     </CCol>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                         <CFormInput
//                             onChange={(e) => setTitleForTravel(e.target.value)}
//                             id="validationTooltip04"
//                             required
//                             type="text"
//                         />
//                         <CFormFeedback tooltip invalid>
//                             Please select title.
//                         </CFormFeedback>
//                     </CCol>
//                 </>
//             ) : category == 'Reality Shows' ? (
//                 <>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Reality Shows Series Name</CFormLabel>
//                         <CFormSelect
//                             onChange={(e) => {
//                                 setRealityShowsSeriesName(e.target.value)
//                                 const selectedRealityShowsSeries = realityShowsSeries.find(
//                                     (item) => item.title === e.target.value,
//                                 )
//                                 if (selectedRealityShowsSeries) {
//                                     setRealityShowsSeriesID(selectedRealityShowsSeries.id)
//                                     console.log('Category ID ====>', selectedRealityShowsSeries.id)
//                                 } else {
//                                     console.log('Selected RealityShows series not found.')
//                                     setRealityShowsSeriesID('')
//                                 }
//                             }}
//                             id="validationTooltip04"
//                             required
//                         >
//                             <option value="">Choose...</option>
//                             {realityShowsSeries.map((item) => {
//                                 // if (item.subcategory === subcategory) {
//                                 return (
//                                     <option key={item.id} value={item.title}>
//                                         {item.title}
//                                     </option>
//                                 )
//                                 // }
//                             })}
//                         </CFormSelect>
//                         <CFormFeedback tooltip invalid>
//                             Please select series name.
//                         </CFormFeedback>
//                     </CCol>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                         <CFormInput
//                             onChange={(e) => setTitleForRealityShows(e.target.value)}
//                             id="validationTooltip04"
//                             required
//                             type="text"
//                         />
//                         <CFormFeedback tooltip invalid>
//                             Please select title.
//                         </CFormFeedback>
//                     </CCol>
//                 </>
//             ) : category == 'Discussions' ? (
//                 <>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Discussions Series Name</CFormLabel>
//                         <CFormSelect
//                             onChange={(e) => {
//                                 setDiscussionsSeriesName(e.target.value)
//                                 const selectedDiscussionsSeries = discussionsSeries.find(
//                                     (item) => item.title === e.target.value,
//                                 )
//                                 if (selectedDiscussionsSeries) {
//                                     setDiscussionsSeriesID(selectedDiscussionsSeries.id)
//                                     console.log('Category ID ====>', selectedDiscussionsSeries.id)
//                                 } else {
//                                     console.log('Selected Discussions series not found.')
//                                     setDiscussionsSeriesID('')
//                                 }
//                             }}
//                             id="validationTooltip04"
//                             required
//                         >
//                             <option value="">Choose...</option>
//                             {discussionsSeries.map((item) => {
//                                 // if (item.subcategory === subcategory) {
//                                 return (
//                                     <option key={item.id} value={item.title}>
//                                         {item.title}
//                                     </option>
//                                 )
//                                 // }
//                             })}
//                         </CFormSelect>
//                         <CFormFeedback tooltip invalid>
//                             Please select series name.
//                         </CFormFeedback>
//                     </CCol>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                         <CFormInput
//                             onChange={(e) => setTitleForDiscussions(e.target.value)}
//                             id="validationTooltip04"
//                             required
//                             type="text"
//                         />
//                         <CFormFeedback tooltip invalid>
//                             Please select title.
//                         </CFormFeedback>
//                     </CCol>
//                 </>
//             ) : category == 'Cookery' ? (
//                 <>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Cookery Series Name</CFormLabel>
//                         <CFormSelect
//                             onChange={(e) => {
//                                 setCookerySeriesName(e.target.value)
//                                 const selectedCookerySeries = cookerySeries.find(
//                                     (item) => item.title === e.target.value,
//                                 )
//                                 if (selectedCookerySeries) {
//                                     setCookerySeriesID(selectedCookerySeries.id)
//                                     console.log('Category ID ====>', selectedCookerySeries.id)
//                                 } else {
//                                     console.log('Selected cookery series not found.')
//                                     setCookerySeriesID('')
//                                 }
//                             }}
//                             id="validationTooltip04"
//                             required
//                         >
//                             <option value="">Choose...</option>
//                             {cookerySeries.map((item) => {
//                                 // if (item.subcategory === subcategory) {
//                                 return (
//                                     <option key={item.id} value={item.title}>
//                                         {item.title}
//                                     </option>
//                                 )
//                                 // }
//                             })}
//                         </CFormSelect>
//                         <CFormFeedback tooltip invalid>
//                             Please select series name.
//                         </CFormFeedback>
//                     </CCol>
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                         <CFormInput
//                             onChange={(e) => setTitleForCookery(e.target.value)}
//                             id="validationTooltip04"
//                             required
//                             type="text"
//                         />
//                         <CFormFeedback tooltip invalid>
//                             Please select title.
//                         </CFormFeedback>
//                     </CCol>
//                 </>
//             ) : (
//                 <CCol md={4} className="position-relative">
//                     <CFormLabel htmlFor="validationTooltip04">Title</CFormLabel>
//                     <CFormInput
//                         onChange={(e) => setTitle(e.target.value)}
//                         id="validationTooltip04"
//                         required
//                         type="text"
//                     />
//
//                     <CFormFeedback tooltip invalid>
//                         Please select title.
//                     </CFormFeedback>
//                 </CCol>
//             )}
//             {category == 'Music' ? (
//                 <>
//                     {/* react tag words */}
//                     <CCol md={4} className="position-relative">
//                         <CFormLabel htmlFor="validationTooltip04">Artist</CFormLabel>
//                         <div className="tags-input-container">
//                             {tags.map((tag, index) => (
//                                 <div className="tag-item" key={index}>
//                                     <span className="text">{tag}</span>
//                                     <span className="close" onClick={() => removeTag(index)}>
//                     &times;
//                   </span>
//                                 </div>
//                             ))}
//                             <input
//                                 onKeyDown={handleKeyDown}
//                                 type="text"
//                                 className="tags-input"
//                                 placeholder="Type artist name and enter "
//                             />
//                         </div>
//                     </CCol>
//                 </>
//             ) : null}
//             {/*{category == 'Teledrama' ? }*/}
//             <div>
//                 {/* css modal for add */}
//                 <CModal alignment="center" visible={visible} onClose={() => handleClose()}>
//                     <CModalHeader>
//                         <CModalTitle>THUMBNAIL</CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>
//                         {selectedImage ? (
//                             <CRow className="mb-3">
//                                 <CImage align="center" rounded src={selectedImage} />
//                             </CRow>
//                         ) : null}
//
//                         <form onSubmit={handleThumbnailUpload}>
//                             <CRow className="mb-2">
//                                 <CCol md={12} className="position-relative">
//                                     <CInputGroup className="mb-1">
//                                         <CFormInput
//                                             type="file"
//                                             id="inputGroupFile04"
//                                             aria-describedby="inputGroupFileAddon04"
//                                             aria-label="upload"
//                                             accept=".webp"
//                                             onChange={imageChange}
//                                         />
//                                     </CInputGroup>
//                                 </CCol>
//                             </CRow>
//
//                             <CRow className="mb-1">
//                                 <CCol md={12} className="position-relative">
//                                     <CProgress className="mb-1">
//                                         <CProgressBar value={progress}>{progress}%</CProgressBar>
//                                     </CProgress>
//                                 </CCol>
//                             </CRow>
//
//                             <CButton type="submit" color="primary" variant="outline" id="inputGroupFileAddon04">
//                                 Upload now
//                             </CButton>
//                         </form>
//                     </CModalBody>
//                 </CModal>
//
//                 {/* css modal for add */}
//                 <CModal alignment="center" visible={visibleAudio} onClose={() => handleClose()}>
//                     <CModalHeader>
//                         <CModalTitle>Podcast file</CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>
//                         {selectedAudio ? (
//                             <CRow className="mb-3">
//                                 <CImage align="center" rounded src={selectedAudio} />
//                             </CRow>
//                         ) : null}
//
//                         <form onSubmit={handleUploadAudio}>
//                             <CRow className="mb-2">
//                                 <CCol md={12} className="position-relative">
//                                     <CInputGroup className="mb-1">
//                                         <CFormInput
//                                             type="file"
//                                             id="inputGroupFile04"
//                                             aria-describedby="inputGroupFileAddon04"
//                                             aria-label="upload"
//                                             accept=".mp3"
//                                             onChange={audioChange}
//                                         />
//                                     </CInputGroup>
//                                 </CCol>
//                             </CRow>
//
//                             <CRow className="mb-1">
//                                 <CCol md={12} className="position-relative">
//                                     <CProgress className="mb-1">
//                                         <CProgressBar value={progress}>{progress}%</CProgressBar>
//                                     </CProgress>
//                                 </CCol>
//                             </CRow>
//                             <CButton type="submit" color="primary" variant="outline" id="inputGroupFileAddon04">
//                                 Upload now
//                             </CButton>
//                         </form>
//                     </CModalBody>
//                 </CModal>
//
//                 {/* css modal for add music audio*/}
//                 <CModal alignment="center" visible={visibleMusicAudio} onClose={() => handleClose()}>
//                     <CModalHeader>
//                         <CModalTitle>Audio Music file</CModalTitle>
//                     </CModalHeader>
//                     <CModalBody>
//                         {selectedMusicAudio ? (
//                             <CRow className="mb-3">
//                                 <CImage align="center" rounded src={selectedMusicAudio} />
//                             </CRow>
//                         ) : null}
//
//                         <form onSubmit={handleUploadMusicAudio}>
//                             <CRow className="mb-2">
//                                 <CCol md={12} className="position-relative">
//                                     <CInputGroup className="mb-1">
//                                         <CFormInput
//                                             type="file"
//                                             id="inputGroupFile04"
//                                             aria-describedby="inputGroupFileAddon04"
//                                             aria-label="upload"
//                                             accept=".mp3"
//                                             onChange={musicAudioChange}
//                                         />
//                                     </CInputGroup>
//                                 </CCol>
//                             </CRow>
//
//                             <CRow className="mb-1">
//                                 <CCol md={12} className="position-relative">
//                                     <CProgress className="mb-1">
//                                         <CProgressBar value={progress}>{progress}%</CProgressBar>
//                                     </CProgress>
//                                 </CCol>
//                             </CRow>
//                             <CButton type="submit" color="primary" variant="outline" id="inputGroupFileAddon04">
//                                 Upload now
//                             </CButton>
//                         </form>
//                     </CModalBody>
//                 </CModal>
//
//                 {category == 'Music' && musicType == 'Video' ? (
//                     <>
//                         <CFormCheck
//                             id="flexCheckChecked"
//                             label="Music Video Series"
//                             checked={isMusicVideoSeries}
//                             onChange={(e) => changeCheckboxForMusicVideoSeries(e.target.checked)}
//                         />
//                     </>
//                 ) : null}
//                 {isMusicVideoSeries == true ? (
//                     <>
//                         {/* mui MusicVideoSeries */}
//                         <CCol md={4} className="position-relative">
//                             <CFormSelect
//                                 id="validationTooltip04"
//                                 onChange={(e) => setMusicVideoSeries(e.target.value)}
//                                 required
//                             >
//                                 <option value="">Select Music Video Series</option>
//                                 {musicVideoSeriesData.map((item) => {
//                                     return (
//                                         <option key={item.id} value={item.name}>
//                                             {item.name}
//                                         </option>
//                                     )
//                                 })}
//                             </CFormSelect>
//                             <CFormFeedback tooltip invalid>
//                                 Please select Category.
//                             </CFormFeedback>
//                         </CCol>
//                     </>
//                 ) : null}
//
//                 {category == 'Podcast' ? (
//                     <>
//                         <CContainer>
//                             <CRow className="row justify-content-md-center">
//                                 <CCol md={4}>
//                                     <img
//                                         onClick={() => setVisible(true)}
//                                         width={200}
//                                         className="rounded"
//                                         src={thumbnail ? thumbnail : thumbnailImage}
//                                         alt=""
//                                     />
//                                 </CCol>
//                             </CRow>
//                         </CContainer>
//                         <CCol md={12} className="position-relative">
//                             <br />
//                             <CFormLabel>{uploadedAudio}</CFormLabel>
//                         </CCol>
//                         {/* mui type */}
//                         <CCol md={12} className="position-relative">
//                             <CFormLabel>Insert Audio File</CFormLabel>
//                             <img
//                                 onClick={() => setVisibleAudio(true)}
//                                 width={50}
//                                 className="rounded"
//                                 src={audio ? audioUploaded : audioUpload}
//                                 alt=""
//                             />
//                             {audio !== '' ? (
//                                 <CBadge color="success">Uploaded</CBadge>
//                             ) : (
//                                 <CBadge color="warning">Empty</CBadge>
//                             )}
//                         </CCol>
//                         <br />
//                         <br />
//                     </>
//                 ) : category == 'Music' && musicType == 'Audio' ? (
//                     <>
//                         <CContainer>
//                             <CRow className="row justify-content-md-center">
//                                 <CCol md={4}>
//                                     <img
//                                         onClick={() => setVisible(true)}
//                                         width={200}
//                                         className="rounded"
//                                         src={thumbnail ? thumbnail : thumbnailImage}
//                                         alt=""
//                                     />
//                                 </CCol>
//                             </CRow>
//                         </CContainer>
//
//                         {/* mui type */}
//                         <CCol md={12} className="position-relative">
//                             <br />
//                             <CFormLabel>{uploadedMusicAudio}</CFormLabel>
//                         </CCol>
//                         <CCol md={12} className="position-relative">
//                             <CFormLabel>Insert Audio Music File</CFormLabel>
//                             <img
//                                 onClick={() => setVisibleMusicAudio(true)}
//                                 width={50}
//                                 className="rounded"
//                                 src={musicAudio ? audioUploaded : audioUpload}
//                                 alt=""
//                             />
//                             {musicAudio !== '' ? (
//                                 <CBadge color="success">Uploaded</CBadge>
//                             ) : (
//                                 <CBadge color="warning">Empty</CBadge>
//                             )}
//                         </CCol>
//                         <br />
//                         <br />
//                     </>
//                 ) : (
//                     <>
//                         <CContainer>
//                             <CRow className="row justify-content-md-center">
//                                 <CCol md={4}>
//                                     <img
//                                         onClick={() => setVisible(true)}
//                                         width={200}
//                                         className="rounded"
//                                         src={thumbnail ? thumbnail : thumbnailImage}
//                                         alt=""
//                                     />
//                                 </CCol>
//                             </CRow>
//                             {/*<CRow>*/}
//                             {/*  <CCol md={4}>*/}
//                             {/*    <img*/}
//                             {/*      onClick={() => setVisibleSubtitle(false)}*/}
//                             {/*      width={80}*/}
//                             {/*      className="rounded"*/}
//                             {/*      src={subtitle !== '' ? ccImage : noCC}*/}
//                             {/*      alt=""*/}
//                             {/*    />*/}
//                             {/*    {subtitle !== '' ? (*/}
//                             {/*      <CBadge color="success">CC UPLOADED</CBadge>*/}
//                             {/*    ) : (*/}
//                             {/*      <CBadge color="warning">CC Empty</CBadge>*/}
//                             {/*    )}*/}
//                             {/*  </CCol>*/}
//                             {/*</CRow>*/}
//                         </CContainer>
//                         {/* css modal for subtitle */}
//                         <CModal
//                             alignment="center"
//                             visible={visibleSubtitle}
//                             onClose={() => setVisibleSubtitle(false)}
//                         >
//                             <CModalHeader>
//                                 <CModalTitle>SUBTITLE</CModalTitle>
//                             </CModalHeader>
//                             <CModalBody>
//                                 <form onSubmit={handleUploadSubtitle}>
//                                     <CRow className="mb-2">
//                                         <CCol md={12} className="position-relative">
//                                             <CInputGroup className="mb-1">
//                                                 <CFormInput
//                                                     type="file"
//                                                     id="inputGroupFile04"
//                                                     aria-describedby="inputGroupFileAddon04"
//                                                     aria-label="upload"
//                                                     accept=".vtt"
//                                                 />
//                                             </CInputGroup>
//                                         </CCol>
//                                     </CRow>
//
//                                     <CRow className="mb-1">
//                                         <CCol md={12} className="position-relative">
//                                             <CProgress className="mb-1">
//                                                 <CProgressBar value={progress}>{progress}%</CProgressBar>
//                                             </CProgress>
//                                         </CCol>
//                                     </CRow>
//
//                                     <CButton
//                                         type="submit"
//                                         color="primary"
//                                         variant="outline"
//                                         id="inputGroupFileAddon04"
//                                     >
//                                         Upload now
//                                     </CButton>
//                                 </form>
//                             </CModalBody>
//                         </CModal>
//
//                         {/* quality section */}
//                         <CRow>
//                             <CCol md={2} className="position-relative">
//                                 <CFormInput id="validationTooltip04" required disabled value="360p - LOW" />
//                             </CCol>
//
//                             <CCol md={10} className="position-relative">
//                                 <CFormInput
//                                     onChange={(e) => qualityArray('360p', e.target.value)}
//                                     id="validationTooltip04"
//                                     required
//                                     type="url"
//                                     value={qualityObj['360p']}
//                                 />
//
//                                 <CFormFeedback tooltip invalid>
//                                     Please input URL.
//                                 </CFormFeedback>
//                             </CCol>
//                         </CRow>
//                         <br />
//                         <CRow>
//                             <CCol md={2} className="position-relative">
//                                 <CFormInput id="validationTooltip04" required disabled value="540p - SD" />
//                             </CCol>
//
//                             <CCol md={10} className="position-relative">
//                                 <CFormInput
//                                     onChange={(e) => qualityArray('540p', e.target.value)}
//                                     id="validationTooltip04"
//                                     required
//                                     type="url"
//                                     value={qualityObj['540p']}
//                                 />
//                                 <CFormFeedback tooltip invalid>
//                                     Please select URL.
//                                 </CFormFeedback>
//                             </CCol>
//                         </CRow>
//                         <br />
//                         <CRow>
//                             <CCol md={2} className="position-relative">
//                                 <CFormInput id="validationTooltip04" required disabled value="720p - HD" />
//                             </CCol>
//
//                             <CCol md={10} className="position-relative">
//                                 <CFormInput
//                                     onChange={(e) => qualityArray('720p', e.target.value)}
//                                     id="validationTooltip04"
//                                     required
//                                     type="url"
//                                     value={qualityObj['720p']}
//                                 />
//
//                                 <CFormFeedback tooltip invalid>
//                                     Please select URL.
//                                 </CFormFeedback>
//                             </CCol>
//                         </CRow>
//                         <br />
//                         <CRow>
//                             <CCol md={2} className="position-relative">
//                                 <CFormInput id="validationTooltip04" required disabled value="1080p - FHD" />
//                             </CCol>
//
//                             <CCol md={10} className="position-relative">
//                                 <CFormInput
//                                     onChange={(e) => qualityArray('1080p', e.target.value)}
//                                     id="validationTooltip04"
//                                     required
//                                     type="url"
//                                     value={qualityObj['1080p']}
//                                 />
//                                 <CFormFeedback invalid>Please select URL.</CFormFeedback>
//                             </CCol>
//                         </CRow>
//                         <br />
//
//                         <CHeaderDivider />
//                     </>
//                 )}
//             </div>
//             <CForm
//                 className="row g-3 needs-validation form"
//                 noValidate
//                 validated={validated}
//                 onSubmit={HandleSubmit}
//             >
//                 {/* mui Description */}
//                 <CCol md={12} className="position-relative">
//                     <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
//                     <CFormTextarea
//                         onChange={(e) => setDescription(e.target.value)}
//                         id="exampleFormControlTextarea1"
//                         rows="4"
//                         required
//                     ></CFormTextarea>
//                     <CFormFeedback tooltip invalid>
//                         Please input content description.
//                     </CFormFeedback>
//                 </CCol>
//                 <CCol md={4} className="position-relative">
//                     <CFormLabel htmlFor="validationTooltip04">Content Type</CFormLabel>
//
//                     <CFormCheck
//                         id="flexCheckChecked"
//                         label="Free"
//                         checked={premium}
//                         onChange={(e) => changeCheckbox(e.target.checked)}
//                     />
//                     {category == 'Movies' ? (
//                         <CFormCheck
//                             id="flexCheckChecked"
//                             label="18+"
//                             checked={noAdultContent}
//                             onChange={(e) => changeCheckboxForNoAdultContent(e.target.checked)}
//                         />
//                     ) : null}
//                 </CCol>
//
//                 <CCol xs={12} className="position-relative">
//                     <CButton color="primary" type="submit">
//                         Upload Now
//                     </CButton>
//                 </CCol>
//             </CForm>
//         </>
//     )
// }
//
// const Index = () => {
//     return (
//         <CRow>
//             <CCol xs={12}>
//                 <CCard className="mb-4">
//                     <CCardHeader>
//                         <h3>BOOKS UPLOAD</h3>
//                     </CCardHeader>
//                     <CCardBody>{ContentData()}</CCardBody>
//                 </CCard>
//             </CCol>
//         </CRow>
//     )
// }
//
// export default Index
