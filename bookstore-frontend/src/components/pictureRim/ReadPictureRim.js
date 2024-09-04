import react, {useEffect, useState} from 'react';
import API_ENDPOINT from "../../apis/httpAxios";
import '../../styles/newscontext.css'
import {FETCH_ALL_NEWS_PICTURE_RIM, FETCH_ALL_READ_NEWS_PICTURE_RIM_ID} from "../../apis/endpoints";
import {useLocation, useNavigate} from "react-router-dom";
import {bgColor} from "../../common/commonColors";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import React from "react";
import {SlArrowLeftCircle} from "react-icons/sl";
import ScreenLoading from "../loading/Loading";
import Footer from "../footer/Footer";
import {FaCircleArrowLeft} from "react-icons/fa6";

const ReadPictureRim=()=> {
    const location = useLocation();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [newsPictureRimData,setNewsPictureRimData] = useState([])
    const [selectedData, setSelectedData] = useState(null);
    // const { id } = location.state;
    const { pictureRimId } = location.state;

    // console.log("id=============>>>>>>>>" , id);
    console.log("pictureRimId=============>>>>>>>>" , pictureRimId);

    const fetchPictureRimForIdData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_NEWS_PICTURE_RIM_ID}/${pictureRimId}`);
            console.log('Selected News Data:', response);
            if (response.status == 200) {
                const selectedNewsData = response.data.data;
                setSelectedData(selectedNewsData);
                setLoading(false);
                console.log("'Selected News Data:', response======>>>", selectedData);
            }else{
                console.log("Data Not founded");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPictureRimForIdData();
    }, []);

    const RedirectPage =() =>{
        Navigate(`/pictureRim/${pictureRimId}`, {state:{pictureRimId:pictureRimId}});
    }

    const shareUrl = `https://readlanka.com/read-pictureRim/${pictureRimId}`;
    // const shareUrl = "http://localhost:3000/read-book";
    const title = "Read Lanka";

    if (loading) {
        return <ScreenLoading />
    }
    return(
        <>
            <div className="top__bar" style={{background:'none'}}>
                <p>
                    <FaCircleArrowLeft onClick={RedirectPage} style={{fontSize: "50px", margin: '3px', color: "black"}}/>
                </p>
            </div>
            <div className='main-outer-picture-rim' style={{userSelect:'none'}}>
                <div className='inner-top-outer-picture-rim'
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <div className='view-news-outer' style={{background: bgColor, userSelect:'none'}}>
                        <div className="left-news-outer-view">
                            <img id="image" src={selectedData.thumbnail_url} alt=''
                                 // style={{width: '100%', height: '300px'}}
                            />
                        </div>
                        <div className="right-news-desc-outer" style={{userSelect:'none'}}>
                            <div className='topic'>
                                <h2 style={{fontSize: '35px', fontWeight:'500', marginBottom:'10px'}}>{selectedData.title}</h2>
                            </div>
                            <div className='news-description-body'>
                                <p style={{fontSize: '25px'}}>{selectedData.description}</p>
                            </div>
                        </div>
                        <div className="Demo__container">
                            <p style={{fontSize: '30px', color: 'red'}}>Share</p>
                            <div className="Demo__some-network">
                                <FacebookShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={30} round/>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <TwitterIcon size={30} round/>
                                </TwitterShareButton>

                                <WhatsappShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <WhatsappIcon size={30} round/>
                                </WhatsappShareButton>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ReadPictureRim
