import { SlArrowLeftCircle } from "react-icons/sl";
import { FaCircleArrowLeft } from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {bgColor} from "../../common/commonColors";
const TopBar = () => {
  const navgate = useNavigate();

  const RedirectPage = async(id) =>{
    // localStorage.clear('selectedAudioId', id);
    navgate("/e-books");
  }
    return (
      <div className="top__bar" style={{backgroundColor:bgColor}}>
        <p>
          {/*<SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"40px", color:"white"}}/>*/}
          <FaCircleArrowLeft  onClick={RedirectPage} style={{fontSize:"50px", color:"white", paddingTop:'5px'}}/>
        </p>
      </div>
    );
  };
  
  export default TopBar;
