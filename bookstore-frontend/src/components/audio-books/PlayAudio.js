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
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bookData, setBookData] =useState([]);
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
              id: book.id,
              title: book.title,
              src: book.bookFile_url["fullBookUrl"],
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

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    }, [currentTrack, isPlaying]);

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
                  isPlaying,
                  setIsPlaying,
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
                <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='right-photo'>
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

