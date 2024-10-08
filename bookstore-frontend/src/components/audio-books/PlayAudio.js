import React from 'react'
import {useState, useEffect, useRef} from 'react';
import {
    FETCH_ALL_AUDIO_BOOK,
    FETCH_ALL_BOOK_SERIES_ID,
    FETCH_ALL_READ_BOOK,
    FETCH_LISTNING_AUDIO, GET_COMMENTS_AUDIO, GET_USER_DATA, SET_COMMENTS_AUDIO,
    SET_LISTNING_AUDIO
} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import DisplayTrack from './DisplayTrack';
import Controls from './Controles';
import ProgressBar from './ProgressBar';
// import TopBar from './TopBar';
import {
    FacebookShareButton,
    FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,
} from "react-share";
import {bgColor, bookPageBackgroundColor, buyNowButton, readButton} from "../../common/commonColors";
import Footer from "../footer/Footer";
import {RiAccountCircleFill} from "react-icons/ri";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import '../../styles/audio.css'
import Modal from "react-bootstrap/Modal";
import {SlArrowLeftCircle} from "react-icons/sl";
import {Helmet} from "react-helmet-async";
import {FaCircleArrowLeft} from "react-icons/fa6";

const AudioPlayer = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bookData, setBookData] = useState([]);
    const [seriesBookData, setSeriesBookData] = useState('');
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedTrackId, setSelectedTrackId] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [seriesData, setSeriesData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [audioBookDataId, setAudioBookDataId] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isRelaxMusicPlaying, setIsRelaxMusicPlaying] = useState(true);
    const [playRelaxMusic, setPlayRelaxMusic] = useState(true);
    const userId = localStorage.getItem('userId');
    // const [relaxMusic, setRelaxMusic] = useState('');


    const relaxMusic = 'https://storage.googleapis.com/readlanka-c7718.appspot.com/series_Audio/Hima%20sela%20bird%2001.mp3?GoogleAccessId=firebase-adminsdk-pqukl%40readlanka-c7718.iam.gserviceaccount.com&Expires=16447017600&Signature=hrzn3IpC6gdOHDOua2o9lg2tavbEstXCys8piDVTHRfUvG4brbdHijpS4xZPvHGKJg9YjFOgSGZNYKuEjy7h3Xn%2Fhj05QtFTXb6Oqv48nHRHJcsO0nZrR6y8dTDAqADmRujnSM3pBbREsHG3LpC8urXQ7mu0ipBCD7OdeIymoBCwELyjzrqDwZ1valn%2B8Q4JNKjxIjiD86dWxXUOdwsmn4oUJts0f09wltXk29GsYnkaPSvht6xEfHmdjOhHvYV%2BfUodenWRT%2FeVjwYvKlHByTVJfOLq2D8EjIog1wRGoALl93IygUxT%2Btcmajm0PpV%2FnMZsKhS3h3gz%2Ffafk0xBVg%3D%3D';

    const {selectedSeriesAudioId} = location.state;
    const selectedBookId = selectedSeriesAudioId;

    const fetchLastPlayedTrackIndex = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_LISTNING_AUDIO}/${userId}_${selectedBookId}`);
            if (response.status === 200) {
                console.log('last played track=============>>>', response.data.data)
                return response.data.data;
            }
        } catch (error) {
            console.error('Error fetching last played track index:', error);
        }
        return {lastPlayedTrackIndex: '', selectedAudioId: ""};
    };

    const commentData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${GET_COMMENTS_AUDIO}/${selectedBookId}`);
            if (response.status == 200) {
                const selectedSeriesData = response.data.data;
                setSeriesData(selectedSeriesData);
                // setRelaxMusic(selectedSeriesData.audio_url);
                setComments(selectedSeriesData.commentList || []);
                console.log('setSeriesData ========= >>>>>',seriesData);
                setLoading(false);
            } else {
                console.log('No comments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        commentData();
    }, [selectedBookId]);

    // const fetchData = async () => {
    //     try {
    //         const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId}`);
    //         if (response.status == 200) {
    //             const selectedBookData = response.data.data;
    //             selectedBookData.sort((a, b) => a.chapter - b.chapter);
    //             setBookData(selectedBookData);
    //             setLoading(false)
    //             // console.log('book Data list =======>>>', bookData)
    //             const updatedTracks = selectedBookData.map(book => ({
    //                 id: book.id,
    //                 title: book.title,
    //                 src: book.bookFile_url["fullBookUrl"],
    //                 authorName: book.authorName,
    //                 thumbnail_url: book.thumbnail_url,
    //                 description: book.description,
    //             }));
    //             setTracks(updatedTracks);
    //
    //             const lastPlayedData = await fetchLastPlayedTrackIndex();
    //             const lastPlayedTrackIndex = lastPlayedData.lastPlayedTrackIndex;
    //             const lastPlayedAudioId = lastPlayedData.selectedAudioId;
    //
    //             setTrackIndex(lastPlayedTrackIndex);
    //             setSelectedTrackId(lastPlayedAudioId);
    //             //  start
    //             const relaxMusicTrack = {
    //                 id: 'relaxMusic',
    //                 title: 'Relax Music',
    //                 src: relaxMusic
    //             };
    //             const audioElement = new Audio(relaxMusicTrack.src);
    //             audioElement.onended = () => {
    //                 if (lastPlayedTrackIndex > 0) {
    //                     setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
    //                 } else {
    //                     setCurrentTrack(updatedTracks[0]);
    //                 }
    //             };
    //
    //             setCurrentTrack(relaxMusicTrack);
    //             audioElement.play();
    //             //  End
    //
    //         } else {
    //             window.location.href = "/login"
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchData();
    // }, [selectedBookId]);
    //
    // const handleNext = () => {
    //     if (playRelaxMusic) {
    //         setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
    //         setPlayRelaxMusic(false);
    //         if (audioRef.current)  audioRef.current.play();
    //     } else {
    //         setPlayRelaxMusic(true);
    //         if (trackIndex == seriesData.ListningChapter) {
    //             const userId = localStorage.getItem('userId');
    //             setShowModal(true);
    //             setIsPlaying(false);
    //             return;
    //         }
    //         if (trackIndex >= tracks.length - 1) {
    //             setTrackIndex(0);
    //             setCurrentTrack(tracks[0]);
    //         } else {
    //             setTrackIndex((prev) => prev + 1);
    //             setCurrentTrack(tracks[trackIndex + 1]);
    //         }
    //         if (audioRef.current)  audioRef.current.play();
    //     }
    // };
    //
    // const handlePrevious = () => {
    //     if (playRelaxMusic) {
    //         setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
    //         setPlayRelaxMusic(false);
    //         if (audioRef.current)  audioRef.current.play();
    //     } else {
    //         setPlayRelaxMusic(true);
    //         if (trackIndex === 0) {
    //             // let lastTrackIndex = tracks.length - 1;
    //             setTrackIndex(trackIndex);
    //             setCurrentTrack(tracks[trackIndex]);
    //             setShowModal(true);
    //         } else {
    //             setTrackIndex((prev) => prev - 1);
    //             // console.log('set previous Last played Track=============>>>>', trackIndex)
    //             setCurrentTrack(tracks[trackIndex - 1]);
    //         }
    //     }
    //     if (audioRef.current)  audioRef.current.play();
    // };


    // New Star
    const fetchData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId}`);
            if (response.status == 200) {
                const selectedBookData = response.data.data;
                selectedBookData.sort((a, b) => a.chapter - b.chapter);
                setBookData(selectedBookData);
                setLoading(false);

                const updatedTracks = selectedBookData.map(book => ({
                    id: book.id,
                    title: book.title,
                    src: book.bookFile_url["fullBookUrl"],
                    authorName: book.authorName,
                    thumbnail_url: book.thumbnail_url,
                    description: book.description,
                }));
                setTracks(updatedTracks);

                const lastPlayedData = await fetchLastPlayedTrackIndex();
                const lastPlayedTrackIndex = lastPlayedData.lastPlayedTrackIndex;
                const lastPlayedAudioId = lastPlayedData.selectedAudioId;

                setTrackIndex(lastPlayedTrackIndex);
                setSelectedTrackId(lastPlayedAudioId);

                setCurrentTrack(updatedTracks[lastPlayedTrackIndex > 0 ? lastPlayedTrackIndex : 0]);

            } else {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedBookId]);

    const handleNext = () => {
        if (trackIndex >= seriesData.chapterLimit-1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
            setShowModal(true);
            setIsPlaying(false);
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
        if (audioRef.current) audioRef.current.play();
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            setTrackIndex(trackIndex);
            setCurrentTrack(tracks[trackIndex]);
            setShowModal(true);
        } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
        if (audioRef.current) audioRef.current.play();
    };

    // New End
    const handlePhotoClick = (id, index) => {
        console.log('selected index chapter track=========>>>>>>>>>>>>>>', index)
        if (index > seriesData.chapterLimit -1 ) {
            setShowModal(true);
            setIsPlaying(false);
        } else {
            localStorage.setItem('selectedAudioId', id);
            setSelectedTrackId(id);
            const selectedTrack = tracks.find((track) => track.id === id);
            setCurrentTrack(selectedTrack);
            setTrackIndex(index);
            setIsPlaying(true);
        }
    };

    const selectedAudioId = localStorage.getItem('selectedAudioId');

    useEffect(() => {
        const fetchAudioData = async () => {
            try {
                let tracId = tracks.find((element) => element.id === selectedTrackId)
                console.log("trackId ====> ", tracId);
                setCurrentTrack(tracId);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (selectedAudioId) {
            fetchAudioData();
        }
    }, [selectedAudioId]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, []);

    const saveProgress = async () => {
        console.log('Saving progress with trackIndex:', trackIndex, 'selectedTrackId:', selectedTrackId);
        try {
            await API_ENDPOINT.post(SET_LISTNING_AUDIO, {
                userId: userId,
                seriesAudioId: selectedBookId,
                selectedAudioId: selectedTrackId,
                lastPlayedTrackIndex: trackIndex,
            });
            console.log('success');
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', saveProgress);
        saveProgress();
    }, [trackIndex, selectedTrackId, selectedBookId]);

    //comment section

    useEffect(() => {
        const getUsersForComments = async () => {
            try {
                const userResponse = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
                const getData = userResponse.data.data;
                setUsersData(getData);
                console.log('usersData===============>>>>>', usersData);
                setAudioBookDataId(getData.purchaseBookListAudio || []);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        getUsersForComments();
    }, [])

    const [formData, setFormData] = useState({
        comment: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await API_ENDPOINT.post(SET_COMMENTS_AUDIO, {
                formData,
                userId: userId,
                seriesId: selectedBookId,
                name: usersData.userName
            });
            setFormData({comment: ""});
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    const HandleCheckout = async () => {
        Navigate(`/checkout-order?id=${selectedBookId}`, {state: {type: "audio", BookDataId: audioBookDataId}})
    }

    // const shareUrl = "http://github.com";
    const shareUrl = `https://readlanka.com/play-audio/${selectedBookId}`;
    const currentURL = "https://readlanka.com" + window.location.pathname;
    const title = "#Read Lanka";

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString();

    }

    const closeModal = () => {
        setShowModal(false);
    };

    const RedirectPage = async (id) => {
        localStorage.removeItem('selectedAudioId');
        window.location.href = "/audio-books";
    }

    return (
        <>
            {/*<TopBar/>*/}
            <div className="top__bar" style={{background: bgColor}}>
                <p>
                    <FaCircleArrowLeft onClick={RedirectPage}
                                       style={{fontSize: "45px", color: "white", paddingTop: '5px'}}/>
                </p>
            </div>
            <div className="main-outer-audio" style={{background: bookPageBackgroundColor}}>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <div className="left-audio-outer">
                    <div className="audio-player">
                        <div className="inner">
                            <DisplayTrack
                                {...{
                                    currentTrack,
                                    audioRef,
                                    setDuration,
                                    progressBarRef,
                                    // setTimeProgress,
                                    handleNext,
                                }}
                            />
                            <ProgressBar
                                {...{progressBarRef, audioRef, timeProgress, duration}}
                            />
                            <Controls
                                {...{
                                    audioRef,
                                    progressBarRef,
                                    duration,
                                    tracks,
                                    trackIndex,
                                    setTrackIndex,
                                    setCurrentTrack,
                                    isPlaying,
                                    setIsPlaying,
                                    setTimeProgress,
                                    handleNext,
                                    handlePrevious,
                                }}
                            />

                        </div>
                    </div>
                </div>

                <div className="right-desc-outer">
                    <p style={{color: 'blue', fontSize: "35px", fontWeight:'800px'}}>{seriesData.seriesTitle}</p>
                    <div style={{height: "10px"}}></div>
                    <div className="audio-book-list">
                        {bookData.sort((a, b) => a.chapter - b.chapter).map((audioBookItem, i) => (
                            <div key={i} onClick={() => handlePhotoClick(audioBookItem.id, i)} className='right-photo'>
                                <img id="image" src={audioBookItem.thumbnail_url}
                                     alt={`Thumbnail of ${audioBookItem.seriesTitle}`}/>
                                <p>{audioBookItem.title}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{height: "20px"}}></div>
                    {/*<div className="audio-description" >*/}
                    <p style={{fontSize: '20px'}}> {seriesData.description} </p>
                    {/*</div>*/}
                    <div className="pricing-card" style={{marginLeft: '-25px', marginTop: '10px'}}>
                        <span> {seriesData.seriesPrice}/- LKR </span>
                    </div>
                    {/*))}*/}

                    {/*<div style={{height: "40px"}}></div>*/}
                    <div className="read-button-outer">
                        <button style={{background: buyNowButton}} onClick={HandleCheckout}><a
                            style={{color: 'white'}}> Buy Now</a>
                        </button>
                    </div>

                    <div style={{height: "10px"}}></div>
                    <div className="Demo__container">
                        <p style={{fontSize: "25px", marginLeft: "50px" ,color:'black'}}> share</p>
                        <div className="Demo__some-network">
                            <FacebookShareButton
                                url={currentURL}
                                htmlTitle={title}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={30} round/>
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={currentURL}
                                className="Demo__some-network__share-button"
                            >
                                <TwitterIcon size={30} round/>
                            </TwitterShareButton>

                            <WhatsappShareButton
                                url={currentURL}
                                className="Demo__some-network__share-button"
                            >
                                <WhatsappIcon size={30} round/>
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height: "40px"}}></div>
            <div className='mirror-wall' style={{backgroundColor:bookPageBackgroundColor}}>
                <img id="image"
                     src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2Fmirror%20wall.jpeg?alt=media&token=5387365f-682b-45e9-a7b6-db017190cf44'
                     alt="Mirror Wall"/>
            </div>
            <div className="comments-section" style={{backgroundColor:bookPageBackgroundColor}}>
                {comments.map((comment, index) => (
                    <div className="comments-list">
                        <div className="comment">
                            <div className="comment-header">
                                <div className="comment-header-left">
                                    <p style={{fontSize: '15px', color: 'black'}}><RiAccountCircleFill
                                        style={{fontSize: '25px', color: 'yellowgreen'}}/> {comment.name}</p>
                                </div>
                                <div className="comment-header-right">
                                    <p style={{fontSize: '15px', color: 'black'}}>
                                        {formatDate(comment.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div className="comment-descriptions">
                                <p>
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comments-form-outer">
                <div className="comments-form">
                    <Form onSubmit={handleCommentSubmit}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                name='comment'
                                value={formData.comment}
                                onChange={handleChange}
                                style={{border: '1px solid blue', height:'35px', fontSize:'17px'}}
                                placeholder="Write a comment..."
                                required
                            />
                            <Button variant="outline-secondary" type="submit" id="button-addon2"
                                    style={{
                                        border: '1px solid blue',
                                        borderRadius: '8px',
                                        marginLeft: '10px',
                                        paddingTop: '-90px',
                                        fontSize:'17px',
                                        color:"black",
                                    }}>
                                Post
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
            </div>
            <div style={{height: "60px"}}></div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>OOPS!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please Buy to continue listening.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer/>
        </>
    );
};

export default AudioPlayer

