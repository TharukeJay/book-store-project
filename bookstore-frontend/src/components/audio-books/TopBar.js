import { SlArrowLeftCircle } from "react-icons/sl";
const TopBar = () => {

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
