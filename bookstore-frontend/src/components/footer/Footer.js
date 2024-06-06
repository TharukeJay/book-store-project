import React from 'react';
import '../../styles/footer.css';

const Footer = () => {
    return (   
    <>
        <div className="footer-top mt-3">
            <div className="row">
                <div className=" footer-links-left">
                    <p className="f-text"></p>
                    <p>58/7, Ranasinha Mv,</p>
                    <p>Meegahawaththa,</p>
                    <p>Siyambalape</p>
                    <p>0112 978238</p>
                    <p>editor@readlanka.com</p>
                </div>
                <div className=" footer-links-midle">
                    <p className="f-text"></p>
                    <p><a href='/privacy-policy'> privacy & policy  </a></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div className=" footer-links-right">
                    <p className="f-text"></p>
                    <p>FaceBook</p>
                    <p>Youtube</p>
                    <p>Instegram</p>
                    <p>Telegram</p>
                </div>
            </div>
        </div>    
        <hr></hr>        
        <div className="footer-top ">
            <p> © 2024.  All rights reserved By CodeMode Pvt Ltd.</p>
        </div>            
    </>  
    );
  }
  export default Footer;
