import { SlArrowLeftCircle } from "react-icons/sl";
const TopBar = () => {

  const RedirectPage = async(id) =>{
    localStorage.clear('selectedAudioId', id);
    window.location.href="/audio-books";
  }
    return (
      <div className="top__bar">
        <p>
          <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"30px", margin:'10px'}}/>
        </p>
      </div>
    );
  };
  
  export default TopBar;
