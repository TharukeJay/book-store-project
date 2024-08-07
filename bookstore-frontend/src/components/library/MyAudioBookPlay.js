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
import {useNavigate, useLocation} from 'react-router-dom';
// import TopBar from './TopBar';
import {bgColor} from "../../common/commonColors";
import Footer from "../footer/Footer";
import '../../styles/audio.css'
import MyBookDisplayTrack from "./MyBookDisplayTrack";
import MyBookProgressBar from "./MyBookProgressBar";
import MyBookControles from "./MyBookControles";
import {SlArrowLeftCircle} from "react-icons/sl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AudioPlayer = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedTrackId, setSelectedTrackId] = useState("");
    const [seriesData, setSeriesData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [isRelaxMusicPlaying, setIsRelaxMusicPlaying] = useState(true);
    const [playRelaxMusic, setPlayRelaxMusic] = useState(true);
    const relaxMusic = 'https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/audio%2F%2Fmixkit-rain-and-thunder-crash-1258.wav?alt=media&token=8238fa5e-de09-486c-bc65-74b7ba2bd901';

    const {selectedSeriesAudioId} = location.state;
    const selectedBookId = selectedSeriesAudioId;
    const userId = localStorage.getItem('userId');

    const fetchLastPlayedTrackIndex = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_LISTNING_AUDIO}/${userId}_${selectedBookId}`);
            if (response.status === 200) {
                return response.data.data;
            }
            console.log("fetchLastPlayedTrackIndex =============>>>", response.data);
        } catch (error) {
            console.error('Error fetching last played track index:', error);
        }
        return {lastPlayedTrackIndex: 0, selectedAudioId: ""};
    };

    const fetchData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId}`);
            if (response.status == 200) {
                const selectedBookData = response.data.data;
                selectedBookData.sort((a, b) => a.chapter - b.chapter);
                // console.log('Selected Book Data for Id new:', selectedBookData);
                setBookData(selectedBookData);
                setLoading(false)

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

                console.log('lastPlayedData=======>>>', lastPlayedData)
                console.log('book data=======>>>', bookData)

                setTrackIndex(lastPlayedTrackIndex);
                setSelectedTrackId(lastPlayedAudioId);

                console.log('Track Index=======>>>', trackIndex)
                // if(lastPlayedTrackIndex > 0){
                //   console.log('First play LastUpdatedTrack');
                //   setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
                // }else{
                //   console.log('Second play Strat array');
                //   setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
                //   setCurrentTrack(updatedTracks[0]);
                // }

                // if (lastPlayedTrackIndex > 0) {
                //     // setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
                //     // setPlayRelaxMusic(false);
                //     setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
                // } else {
                //     // setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
                //     // setPlayRelaxMusic(false);
                //
                //     setCurrentTrack(updatedTracks[0]);
                // }

                //  start
                const relaxMusicTrack = {
                    id: 'relaxMusic',
                    title: 'Relax Music',
                    src: relaxMusic
                };

                const audioElement = new Audio(relaxMusicTrack.src);

                audioElement.onended = () => {
                    if (lastPlayedTrackIndex > 0) {
                        setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
                    } else {
                        setCurrentTrack(updatedTracks[0]);
                    }
                };

                setCurrentTrack(relaxMusicTrack);
                audioElement.play();
                //  End
            } else {
                window.location.href = "/login"
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedBookId]);

    // const handleNext = () => {
    //   if (isRelaxMusicPlaying) {
    //     setIsRelaxMusicPlaying(false);
    //     if (trackIndex === 2) {
    //       const userId = localStorage.getItem('userId');
    //       setShowModal(true);
    //       setIsPlaying(false);
    //       return;
    //     }
    //     if (trackIndex >= tracks.length - 1) {
    //       setTrackIndex(0);
    //       setCurrentTrack(tracks[0]);
    //     } else {
    //       setTrackIndex((prev) => prev + 1);
    //       setCurrentTrack(tracks[trackIndex + 1]);
    //     }
    //   } else {
    //     setIsRelaxMusicPlaying(true);
    //     setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
    //   }
    // };

    const handleNext = () => {
        if (playRelaxMusic) {
            setCurrentTrack({id: 'relaxMusic', title: 'Relax Music', src: relaxMusic});
            setPlayRelaxMusic(false);
        } else {
            setPlayRelaxMusic(true);
            if (trackIndex >= tracks.length - 1) {
                setTrackIndex(0);
                setCurrentTrack(tracks[0]);
            } else {
                setTrackIndex((prev) => prev + 1);
                setCurrentTrack(tracks[trackIndex + 1]);
            }
        }
    };

    const handlePrevious = () => {
        if (playRelaxMusic) {
            setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
            setPlayRelaxMusic(false);
        } else {
            setPlayRelaxMusic(true);
            if (trackIndex === 0) {
                // let lastTrackIndex = tracks.length - 1;
                setTrackIndex(trackIndex);
                setCurrentTrack(tracks[trackIndex]);
                setShowModal(true);
            } else {
                setTrackIndex((prev) => prev - 1);
                console.log('set previous Last played Track=============>>>>', trackIndex)
                setCurrentTrack(tracks[trackIndex - 1]);
            }
        }
    };

    const handlePhotoClick = (id, index) => {
        console.log('selected index chapter track=========>>>>>>>>>>>>>>', index)
        localStorage.setItem('selectedAudioId', id);
        setSelectedTrackId(id);
        const selectedTrack = tracks.find((track) => track.id === id);
        setCurrentTrack(selectedTrack);
        setTrackIndex(index);
        setIsPlaying(true);
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
    }, [currentTrack, isPlaying]);

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
    }, [trackIndex, selectedTrackId]);

    useEffect(() => {
        const getUsersForComments = async () => {
            try {
                const userResponse = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
                const getData = userResponse.data;
                setUsersData(getData.data);
                console.log('user data ==============>>>>:', usersData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getUsersForComments();
    }, [])

    const RedirectPage = () => {
        window.location.href = "/myBookRack/audio";
    }

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="top__bar">
                <p>
                    <SlArrowLeftCircle onClick={RedirectPage}
                                       style={{fontSize: "40px", margin: '3px', color: "white"}}/>
                </p>
            </div>
            <div className="main-outer-audio" style={{background: bgColor}}>
                <div className="left-audio-outer">
                    <div className="audio-player">
                        <div className="inner">
                            <MyBookDisplayTrack
                                {...{
                                    currentTrack,
                                    audioRef,
                                    setDuration,
                                    progressBarRef,
                                    handleNext,
                                }}
                            />
                            <MyBookProgressBar
                                {...{progressBarRef, audioRef, timeProgress, duration}}
                            />
                            <MyBookControles
                                {...{
                                    audioRef,
                                    progressBarRef,
                                    duration,
                                    setTimeProgress,
                                    tracks,
                                    trackIndex,
                                    setTrackIndex,
                                    setCurrentTrack,
                                    isPlaying,
                                    setIsPlaying,
                                    handleNext,
                                    handlePrevious,
                                }}
                            />

                        </div>
                    </div>
                </div>

                <div className="right-desc-outer">
                    <h3 style={{color: 'blue'}}>{seriesData.seriesTitle}</h3>
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
                    <p style={{fontSize: '15px'}}> {seriesData.description} </p>
                    <div style={{height: "10px"}}></div>
                </div>
            </div>
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
    )
};

export default AudioPlayer

