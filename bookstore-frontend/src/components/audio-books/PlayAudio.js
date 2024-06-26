import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect, useRef } from 'react';
import {
  FETCH_ALL_AUDIO_BOOK,
  FETCH_ALL_BOOK_SERIES_ID,
  FETCH_ALL_READ_BOOK,
  FETCH_LISTNING_AUDIO,
  SET_LISTNING_AUDIO
} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { useNavigate, useLocation  } from 'react-router-dom';
import DisplayTrack from './DisplayTrack';
import Controls from './Controles';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';
import {
  FacebookShareButton,
  FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,
} from "react-share";
import {bgColor} from "../../common/commonColors";
import Footer from "../footer/Footer";

const AudioPlayer  = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bookData, setBookData] =useState([]);
  const [seriesBookData, setSeriesBookData] =useState('');
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackId, setSelectedTrackId]= useState("");

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  // const selectedBookId = localStorage.getItem('selectedSeriesAudioId');
  const { selectedSeriesAudioId } = location.state;
  const selectedBookId = selectedSeriesAudioId;
  // console.log("selectedSeriesAudioId =============>>>", selectedBookId);
  const userId = localStorage.getItem('userId');

  // useEffect(() => {
    const fetchLastPlayedTrackIndex = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_LISTNING_AUDIO}/${userId}/${selectedBookId}`);
          if (response.status === 200) {
            return response.data.data;
          }
          console.log("fetchLastPlayedTrackIndex =============>>>", response.data);
        } catch (error) {
          console.error('Error fetching last played track index:', error);
        }
        return { lastPlayedTrackIndex: 0, selectedAudioId: "" };
      };
  //   fetchLastPlayedTrackIndex();
  // }, []);

  useEffect(() => {
      // console.log('selected Book Data Execute start');
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
            setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
            setSelectedTrackId(lastPlayedAudioId);
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
    console.log('selected Book Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
        const allAudioBookData = response.data.data;
        console.log('allAudioBookData===============>>>', allAudioBookData);
        const filteredData = allAudioBookData.filter(book => book.seriesId === selectedBookId);
        setSeriesBookData(filteredData);
        console.log('setSeriesBookData===============>>>', filteredData);
        console.log('setSeriesBookData===============>>>', seriesBookData.description);

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
        if (isPlaying) {
          audioRef.current.play();
        }
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

  const shareUrl = "http://github.com";
  // const shareUrl = "http://localhost:3000/read-book";
  const title = "GitHub";

    return (
      <>
      <TopBar />
      <div className="main-outer-audio" style={{background:bgColor}}>
        <div className="left-audio-outer">
          <div className="audio-player">
            <div className="inner">
              <DisplayTrack
                {...{
                  currentTrack,
                  audioRef,
                  setDuration,
                  progressBarRef,
                  handleNext,
                }}
              />
              <ProgressBar
                  {...{ progressBarRef, audioRef, timeProgress, duration }}
              />
              <Controls
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
          <div className="audio-book-list">
            {bookData.sort((a, b) => a.chapter - b.chapter).map((audioBookItem, i) => (
                <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='right-photo'>
                  <img src={audioBookItem.thumbnail_url} alt={`Thumbnail of ${audioBookItem.seriesTitle}`}/>
                  <p>{audioBookItem.title}</p>
                </div>
            ))}
          </div>

          <div className="pricing-card">
            <p>{seriesBookData.description}</p>
          </div>
          {/*{seriesBookData.map(audioBook => (*/}
          <div className="pricing-card">
            <span>LKR {seriesBookData.price} </span>
          </div>
          {/*))};*/}
          <div style={{height: "40px"}}></div>

          <div className="read-button-outer">
            <button><a
                href={`/checkout-order?price=${bookData.price}&title=${encodeURIComponent(bookData.title)}`}> Buy
              Now</a></button>
          </div>

          <div style={{height: "40px"}}></div>

          <div className="Demo__container">
            <div className="Demo__some-network">
              <FacebookShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
              >
                <FacebookIcon size={50} round/>
              </FacebookShareButton>
              <TwitterShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
              >
                <TwitterIcon size={50} round/>
              </TwitterShareButton>

              <WhatsappShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={50} round/>
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
      </>
    );
};

export default AudioPlayer

