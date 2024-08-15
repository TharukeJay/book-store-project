import React from 'react'
import { BsMusicNoteBeamed } from 'react-icons/bs';


const DisplayTrack = ({
    currentTrack,
    audioRef,
    setDuration,
    progressBarRef,
    handleNext,
    // setTimeProgress,
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

          {/*<audio*/}
          {/*    ref={audioRef}*/}
          {/*    key={currentTrack?.src} // Added key prop*/}
          {/*    src={currentTrack?.src}*/}
          {/*    onLoadedData={(e) => setDuration(e.currentTarget.duration)}*/}
          {/*    onTimeUpdate={(e) => setTimeProgress(e.currentTarget.currentTime)}*/}
          {/*/>*/}

          <div className="audio-info">
              <div className="audio-image">
                  {currentTrack?.thumbnail_url ? (
                      <img id="image" src={currentTrack?.thumbnail_url || ""} alt="audio avatar"/>
                  ) : (
                      <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed/>
              </span>
                      </div>
                  )}
              </div>
              <div className="text">
                  <p className="title" style={{fontSize: '15px'}}>{currentTrack?.title}</p>
                  <p className="desc" style={{fontSize: '15px'}}>Author: {currentTrack?.authorName}</p>
                  <p className="desc" style={{fontSize: '15px'}}>{currentTrack?.description}</p>
              </div>
          </div>
      </>
  )
}

export default DisplayTrack
