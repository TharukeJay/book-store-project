import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect, useRef } from 'react';
import { FETCH_ALL_BOOK_SERIES_ID, FETCH_ALL_READ_BOOK} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { useNavigate  } from 'react-router-dom';
import DisplayTrack from './DisplayTrack';
import Controls from './Controles';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';
// import { tracks } from '../data/track';
// import tracks from '../data/track'

const AudioPlayer  = () => {
  const Navigate = useNavigate();
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bookData, setBookData] =useState([]);
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  const selectedBookId = localStorage.getItem('selectedSeriesAudioId');

    useEffect(() => {
      console.log('selected Book Data Execute start');
      const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId}`);
          if (response.status == 200) {
            const selectedBookData = response.data.data;
            console.log('Selected Book Data for Id:', selectedBookData);
            setBookData(selectedBookData);
            setLoading(false)
            
            const updatedTracks = selectedBookData.map(book => ({
              title: book.title,
              src: book.bookFile_url,
              authorName: book.authorName,
              thumbnail_url: book.thumbnail_url,
              description: book.description,
            }));
            setTracks(updatedTracks);
            setCurrentTrack(updatedTracks[0]);
            setTrackIndex(0);
          }else{
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);

    const handlePhotoClick = (id) => {
      localStorage.setItem('selectedAudioId', id);
      Navigate('/play-audio');
    }; 

    // adding new code 

    // const selectedAudioId = localStorage.getItem('selectedSeriesAudioId');
    // useEffect(() => {
    //   const fetchAudioData = async () => {
    //     try {
    //       const response = await API_ENDPOINT.get(`${FETCH_ALL_BOOK_SERIES_ID}/${selectedAudioId}`);
    //       if (response.status === 200) {
    //         const selectedAudioBookData = response.data.data;
    //         const updatedTracks = selectedAudioBookData.map(book => ({
    //           title: book.title,
    //           src: book.bookFile_url,
    //           author: book.authorName,
    //           thumbnail: book.thumbnail_url,
    //         }));
    //         setTracks(updatedTracks);
    //         setCurrentTrack(updatedTracks[0]);
    //         setTrackIndex(0);
    //         setBookData(selectedAudioBookData);
    //         setLoading(false);
    //       } else {
    //         window.location.href = "/login";
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };
  
    //   if (selectedAudioId) {
    //     fetchAudioData();
    //   }
    // }, [selectedAudioId]);

    // adding new code 

    const selectedAudioId = localStorage.getItem('selectedAudioId');
    useEffect(() => {
      const fetchAudioData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedAudioId}`);
          if (response.status === 200) {
            const selectedAudioBookData = response.data.data;
            const updatedTracks = [{
              title: selectedAudioBookData.title,
              src: selectedAudioBookData.bookFile_url,
              authorName: selectedAudioBookData.authorName,
              thumbnail_url: selectedAudioBookData.thumbnail_url,
              description: selectedAudioBookData.description,
            }]
            setTracks(updatedTracks);
            setCurrentTrack(updatedTracks[0]);
            setTrackIndex(0);
            // setBookData(updatedTracks);
            setLoading(false);
          } else {
            window.location.href = "/login";
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      if (selectedAudioId) {
        fetchAudioData();
      }
    }, [selectedAudioId]);

    return (
      <>
      <TopBar />
      <div className="main-outer-audio">
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
                  handleNext,
                }}
              />
              <ProgressBar
                {...{ progressBarRef, audioRef, timeProgress, duration }}
              />
            </div>
          </div>
        </div>
        <div className="right-desc-outer">
          <div className="book-list">
            {bookData && bookData.map((audioBookItem, i) => (
                <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='photo'>
                  <img src={audioBookItem.thumbnail_url}alt={`Thumbnail of ${audioBookItem.seriesTitle}`} />
                  <h4>{audioBookItem.title}</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
      </>
    );
  };

export default AudioPlayer 
