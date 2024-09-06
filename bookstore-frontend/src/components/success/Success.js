import React from 'react';
import '../../styles/success.css'
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const Success = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const type = location.state;

    // const bookType = type.type;
    // console.log('bookType ==========>>>>>>>', bookType)

    const ConfirmPayment =async ()=> {
        // if(bookType =='book'){
        //     Navigate('/myBookRack/eBook')
        // }
        // if(bookType =='audio'){
        //     Navigate('/myBookRack/audio')
        // }

        Navigate('/myBookRack')
    }
    return(
        <div style={{width:'100%', display:"flex", alignItems:'center', justifyContent:'center', marginTop:'60px'}}>
            <div className='body'>
                <div className="card">
                    <div style={{
                        borderRadius: '200px',
                        height: '200px',
                        width: '200px',
                        background: '#F8FAF5',
                        margin: '0 auto'
                    }}>
                        <i className="checkmark">✓</i>
                    </div>
                    <h1>Success</h1>
                    <p>Your payment has been successful<br/> e'll be in touch soon!</p>
                    <div style={{height:'40px'}}></div>
                    <div>
                        <button className='btn btn-success' style={{padding:'10px 30px', fontSize:'15px'}} onClick={ConfirmPayment}>Go Back to Book Rack</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
