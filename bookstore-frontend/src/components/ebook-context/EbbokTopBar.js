import { SlArrowLeftCircle } from "react-icons/sl";
import { FaCircleArrowLeft } from "react-icons/fa6";
const TopBar = () => {

  const RedirectPage = async(id) =>{
    // localStorage.clear('selectedAudioId', id);
    window.location.href="/e-books";
  }
    return (
      <div className="top__bar">
        <p>
          {/*<SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"40px", color:"white"}}/>*/}
          <FaCircleArrowLeft  onClick={RedirectPage} style={{fontSize:"40px", color:"white", paddingTop:'5px'}}/>
        </p>
      </div>
    );
  };
  
  export default TopBar;
