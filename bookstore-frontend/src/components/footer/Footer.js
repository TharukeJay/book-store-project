import react from 'react';
import '../../styles/footer.css';

const Footer = () => {
    return (   
        <>
            <div className="footer-top mt-3">
                <div className="row">
                    <div className=" footer-links">
                        <span className="f-text">
                        <span style={{color:'red', backgroundColor:'rgb(246, 199, 199)', fontSize:'30px'}}>Read</span>
                        <span style={{color:'green', backgroundColor:'rgb(246, 199, 199)', fontSize:'25px'}}>Lanka</span>
                        </span>
                    
                    </div>

                    <div className="  footer-links">
                        <h4 className="f-text">Our Services</h4>
                    </div>

                    <div className=" footer-links">
                        <h4 className="f-text">Our Social Networks</h4>
                    </div>
                </div>
            </div>            
        </>  
    );
  }
  export default Footer;
