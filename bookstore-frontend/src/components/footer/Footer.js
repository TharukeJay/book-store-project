import React from 'react';
import '../../styles/footer.css';
import * as PropTypes from "prop-types";
import { ImWhatsapp } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { LuTwitter } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
    return (
    <>
        <div className="footer-top mt-3">
            <div className="row">
                <div className=" footer-links-left">
                    <p className="f-text"></p>
                    <p>58/7, Ranasinha Mv,Meegahawaththa</p>
                    {/*<p>Meegahawaththa,</p>*/}
                    <p>Siyambalape</p>
                    <p>Tel : 0711222045</p>
                    <p>editor@readlanka.com</p>
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
                    <p><a href=''><ImWhatsapp size={20}/></a></p>
                    <p><a href=''><FaFacebook size={20}/></a></p>
                    <p><a href=''><LuInstagram size={20}/></a></p>
                    <p><a href=''><LuTwitter size={20}/></a></p>
                </div>
            </div>
        </div>
        <hr></hr>
        <div className="footer-bottum ">
            <p> © 2024.  All rights reserved By CodeMode Pvt Ltd.</p>
        </div>
    </>
    );
  }
  export default Footer;
