import React from 'react';
import '../../styles/footer.css';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterest, FaFacebook, FaWhatsapp, FaTelegram
} from "react-icons/fa";
import {bgColor, homePageBackgroundColor} from "../../common/commonColors";
import {useNavigate} from 'react-router-dom';


const Footer = () => {
    const navigate = useNavigate();

    const privacyPolicy = () => {
        navigate('/privacy-policy');  // Use navigate to go to the desired route
    }
    const aboutUs = () => {
        navigate('/about');
    }

    return (
        <>
            <div className="footer-top mt-3" style={{backgroundColor: bgColor}}>
                <div className="row">
                    <div className="inside-row">
                        <div className=" footer-links-left">
                            <p className="f-text"></p>
                            {/*<p>Contact Us : <a href='mailto:editor@readlanka.com'>editor@readlanka.com</a></p>*/}
                            <p onClick={() => {
                                    window.location.href = 'mailto:editor@readlanka.com';
                                }}
                                style={{color: 'darkred', cursor: 'pointer'}}>
                                Contact Us : editor@readlanka.com
                            </p>

                        </div>
                        <div className=" footer-links-midle">
                            <p className="f-text"></p>
                            {/*<p><a href='/privacy-policy'> privacy & policy </a></p>*/}
                            <p onClick={privacyPolicy} style={{cursor: 'pointer', color: 'darkred'}}>
                                Privacy & Policy
                            </p>
                            <p></p>
                            <p className="f-text"></p>
                            {/*<p className="f-text"><a href='/about'> Contact us </a></p>*/}
                            <p onClick={aboutUs} style={{cursor: 'pointer', color: 'darkred'}}>
                                About Us
                            </p>
                            <p></p>
                            <p></p>
                        </div>

                        <div className=" footer-links-right">
                            <p style={{background: "green", borderRadius: '20%'}}><a href=''><FaWhatsapp size={30}
                                                                                                         style={{color: 'white'}}/></a>
                            </p>
                            <p><a href=''><FaFacebook size={35} style={{color: 'blue'}}/></a></p>
                            <p style={{background: "#f94449", borderRadius: '10%'}}><a href=''><FaInstagram size={30}
                                                                                                            style={{color: 'white'}}/></a>
                            </p>
                            <p><a href=''><FaTelegram size={35} style={{color: '#1E90FF'}}/></a></p>
                            <p><a href=''><FaTwitter size={35} style={{color: '#1E90FF'}}/></a></p>
                        </div>
                    </div>

                </div>
            </div>
            <hr></hr>
            <div className="footer-bottum " style={{backgroundColor: bgColor}}>
                <p> © 2024. All rights reserved By CodeMode Pvt Ltd.</p>
            </div>
        </>
    );
}
export default Footer;
