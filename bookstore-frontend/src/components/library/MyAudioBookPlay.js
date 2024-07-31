import React from 'react'
import { useState,useEffect, useRef } from 'react';
import {
    FETCH_ALL_AUDIO_BOOK,
    FETCH_ALL_BOOK_SERIES_ID,
    FETCH_ALL_READ_BOOK,
    FETCH_LISTNING_AUDIO, GET_COMMENTS_AUDIO, GET_USER_DATA, SET_COMMENTS_AUDIO,
    SET_LISTNING_AUDIO
} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { useNavigate, useLocation  } from 'react-router-dom';
// import TopBar from './TopBar';
import {
    FacebookShareButton,
    FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,
} from "react-share";
import {bgColor} from "../../common/commonColors";
import Footer from "../footer/Footer";
import {RiAccountCircleFill} from "react-icons/ri";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import '../../styles/audio.css'
import MyBookDisplayTrack from "./MyBookDisplayTrack";
import MyBookProgressBar from "./MyBookProgressBar";
import MyBookControles from "./MyBookControles";
import {SlArrowLeftCircle} from "react-icons/sl";

const AudioPlayer  = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bookData, setBookData] =useState([]);
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState([]);
    const audioRef = useRef();
    const progressBarRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedTrackId, setSelectedTrackId]= useState("");
    const [seriesData, setSeriesData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const relaxMusic = 'https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/audio%2F%2Fmixkit-rain-and-thunder-crash-1258.wav?alt=media&token=8238fa5e-de09-486c-bc65-74b7ba2bd901';

    const [isRelaxMusicPlaying, setIsRelaxMusicPlaying] = useState(true);

    const handleNext = () => {
        if (isRelaxMusicPlaying) {
            setIsRelaxMusicPlaying(false);
            // setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
        } else {
            setIsRelaxMusicPlaying(true);
            if (trackIndex >= tracks.length - 1) {
                setTrackIndex(0);
                setCurrentTrack(tracks[0]);
            } else {
                setTrackIndex((prev) => prev + 1);
                setCurrentTrack(tracks[trackIndex + 1]);
            }
        }
    };

    const { selectedSeriesAudioId } = location.state;
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
        return { lastPlayedTrackIndex: 0, selectedAudioId: "" };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId}`);
                if (response.status == 200) {
                    const selectedBookData = response.data.data;
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
                    // setCurrentTrack(updatedTracks[0]);
                    // setTrackIndex(0);

                    const lastPlayedData = await fetchLastPlayedTrackIndex();
                    const lastPlayedTrackIndex = lastPlayedData.lastPlayedTrackIndex;
                    const lastPlayedAudioId = lastPlayedData.selectedAudioId;

                    setTrackIndex(lastPlayedTrackIndex);
                    // setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
                    // setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
                    // setSelectedTrackId(lastPlayedAudioId);

                    if(lastPlayedTrackIndex >= 0){
                        setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
                    }else{
                        setCurrentTrack({ id: 'relaxMusic', title: 'Relax Music', src: relaxMusic });
                    }
                }else{
                    window.location.href="/login"
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            // if (isPlaying) {
            //     audioRef.current.play();
            // }
        }
    }, [currentTrack, isPlaying]);

    const saveProgress = async () => {
        try {
            await API_ENDPOINT.post(SET_LISTNING_AUDIO, {
                userId: userId,
                seriesAudioId: selectedBookId,
                selectedAudioId: selectedTrackId,
                lastPlayedTrackIndex: trackIndex,
            });
            console.error('success');
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', saveProgress);
        return () => {
            window.removeEventListener('beforeunload', saveProgress);
            saveProgress();
        };
    }, [trackIndex, selectedTrackId]);

    const handlePhotoClick = (id) => {
        localStorage.setItem('selectedAudioId', id);
        setSelectedTrackId(id);
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

    useEffect(() =>{
        const getUsersForComments = async () =>{
            try {
                const userResponse = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
                const getData = userResponse.data;
                setUsersData(getData.data);
                console.log('user data ==============>>>>:',usersData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getUsersForComments();
    },[])

    const RedirectPage =()=>{
        window.location.href="/myBookRack/audio";
    }

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
                            <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='right-photo'>
                                <img src={audioBookItem.thumbnail_url}
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
            <Footer/>
        </>
    )
};

export default AudioPlayer

