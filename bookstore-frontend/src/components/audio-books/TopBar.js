import { SlArrowLeftCircle } from "react-icons/sl";
const TopBar = ({ userId, selectedBookId, selectedTrackId, trackIndex }) => {

  const saveProgress = async () => {
    try {
      await API_ENDPOINT.post(SET_LISTNING_AUDIO, {
        userId: userId,
        seriesAudioId: selectedBookId,
        selectedAudioId: selectedTrackId,
        lastPlayedTrackIndex: trackIndex,
      });
      console.log('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const RedirectPage = async(id) =>{
    localStorage.removeItem('selectedAudioId');
    window.location.href="/audio-books";
  }
    return (
      <div className="top__bar">
        <p>
          <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"40px", color:"white" , paddingTop:'5px'}}/>
        </p>
      </div>
    );
  };
  
  export default TopBar;
