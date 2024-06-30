import { SlArrowLeftCircle } from "react-icons/sl";
const TopBar = () => {

  const RedirectPage = async(id) =>{
    // localStorage.clear('selectedAudioId', id);
    window.location.href="/";
  }
    return (
      <div className="top__bar">
        <p>
          <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"40px", margin:'10px', color:"white"}}/>
        </p>
      </div>
    );
  };
  
  export default TopBar;
