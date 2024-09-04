import React from 'react';
import '../../styles/footer.css';
import * as PropTypes from "prop-types";
// import { ImWhatsapp } from "react-icons/im";
// import { FaFacebook } from "react-icons/fa";
// import { LuInstagram } from "react-icons/lu";
// import { LuTwitter } from "react-icons/lu";
// import { MdOutlineEmail } from "react-icons/md";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaPinterest, FaFacebook, FaWhatsapp, FaTelegram
} from "react-icons/fa";

const Footer = () => {
    // let circleClasses = "inline-block p-7 rounded-full w-20 mx-auto";
    let iconStyles = {color: "white", fontSize: "1.5em"};
    return (
        <>
            <div className="footer-top mt-3">
                <div className="row">
                    <div className="inside-row">
                        <div className=" footer-links-left">
                            <p className="f-text"></p>
                            <p>Contact Us : <a href='mailto:editor@readlanka.com'
                                               style={{color: 'black'}}>editor@readlanka.com</a></p>
                        </div>
                        <div className=" footer-links-midle">
                            <p className="f-text"></p>
                            <p><a href='/privacy-policy'> privacy & policy </a></p>
                            <p></p>
                            <p className="f-text"></p>
                            <p><a href='/about'> Contact us </a></p>
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
            <div className="footer-bottum ">
                <p> © 2024. All rights reserved By CodeMode Pvt Ltd.</p>
            </div>
        </>
    );
}
export default Footer;
