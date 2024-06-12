import React from 'react'
import { BsMusicNoteBeamed } from 'react-icons/bs';


const DisplayTrack = ({ 
    currentTrack,
    audioRef,
    setDuration,
    progressBarRef,
    handleNext, 
}) => {

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
      };

  return (
    <>
      <audio
        src={currentTrack?.src || ""}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack?.thumbnail_url ? (
            <img src={currentTrack?.thumbnail_url || ""} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{currentTrack?.title}</p>
          <p className="desc">Author:  {currentTrack?.authorName }</p>
          <p className="desc">{currentTrack?.description}</p>
        </div>
      </div>
    </>
  )
}

export default DisplayTrack
