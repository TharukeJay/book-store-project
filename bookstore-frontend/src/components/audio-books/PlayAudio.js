import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect, useRef } from 'react';
import { FETCH_ALL_READ_BOOK } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'
import DisplayTrack from './DisplayTrack';
import Controls from './Controles';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';
import { tracks } from '../data/track';

const AudioPlayer  = () => {

  // // states
  // const [trackIndex, setTrackIndex] = useState(0);
  // const [currentTrack, setCurrentTrack] = useState(
  //   tracks[trackIndex]
  // );
  // const [timeProgress, setTimeProgress] = useState(0);
  // const [duration, setDuration] = useState(0);

  // // reference
  // const audioRef = useRef();
  // const progressBarRef = useRef();

  // const handleNext = () => {
  //   if (trackIndex >= tracks.length - 1) {
  //     setTrackIndex(0);
  //     setCurrentTrack(tracks[0]);
  //   } else {
  //     setTrackIndex((prev) => prev + 1);
  //     setCurrentTrack(tracks[trackIndex + 1]);
  //   }
  // };

  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const selectedAudioBookId = localStorage.getItem('selectedAudioId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedAudioBookId}`);
        if (response.status === 200) {
          const selectedBookData = response.data.data;
          console.log('Selected Audio Book Data:', selectedBookData);

          console.log("Hi=======>>>>");
          const trackData = {
            title: selectedBookData.title,
            src: selectedBookData.file,
            // author: book.author,
            thumbnail: selectedBookData.thumbnail
          }

          console.log("trackData=======>>>>", trackData);
          setTracks([trackData]);
          setCurrentTrack(trackData);
          setLoading(false);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedAudioBookId]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  if (loading) {
    return <ScreenLoading />;
  }



    return (
      <>
              <TopBar />
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

      </>
    );
  };

export default AudioPlayer 
