import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../styles/newscontext.css'
import {bgColor, bookPageBackgroundColor} from "../../common/commonColors";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import API_ENDPOINT from "../../apis/httpAxios";
import {
    FETCH_ALL_NEWS_PICTURE_RIM,
    FETCH_ALL_READ_NEWS,
    FETCH_ALL_READ_NEWS_ID,
    FETCH_ALL_READ_NEWS_PICTURE_RIM_ID
} from "../../apis/endpoints";
import {SlArrowLeftCircle} from "react-icons/sl";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from "react-icons/md";
import ScreenLoading from "../loading/Loading";
import Footer from "../footer/Footer";
import {Helmet} from "react-helmet-async";
import {FaCircleArrowLeft} from "react-icons/fa6";

const PictureRim =()=>{
    const location = useLocation();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [newsPictureRimData,setNewsPictureRimData] = useState([])
    const [selectedData, setSelectedData] = useState(null);
    const [newsPictureRimIdData, setNewsPictureRimIdData] = useState(null);
    const [index, setIndex] = useState(0);
    const itemsPerPage = 6;
    const { pictureRimId } = location.state;

    console.log("pictureRimId picture page=============>>>>>>>>" , pictureRimId);

    const getnNewsPictureRim = async () => {
        try {
            const response = await API_ENDPOINT.get(FETCH_ALL_NEWS_PICTURE_RIM);
            const PictureRimData = response.data.data;
            setNewsPictureRimData(PictureRimData);
            console.log('newsPictureRimData all  : =================>>>>', newsPictureRimData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchPictureRimForIdData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_NEWS_PICTURE_RIM_ID}/${pictureRimId}`);
            if (response.status == 200) {
                const selectedNewsData = response.data.data;
                console.log('Selected News Data:', selectedNewsData);
                setNewsPictureRimIdData(selectedNewsData);
                setLoading(false);
                console.log("'Selected News Data response======>>>", newsPictureRimIdData);
            }else{
                console.log("Data Not founded");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // console.log('selected newsPictureRim Data:', newsPictureRimIdData);

    useEffect(() => {
        fetchPictureRimForIdData();
        getnNewsPictureRim();
    }, []);

    const RedirectPage =() =>{
        Navigate('/news-papers');
    }

    const handleNewsClick = (id) => {
        console.log('selected pic id: ========>>>', id)
        Navigate(`/read-pictureRim/${id}`,{state:{id: id, pictureRimId: pictureRimId}});
    };

    const truncateDescription = (description) => {
        if (!description) {
            return '';
        }
        const words = description.split(' ');
        if (words.length > 15) {
            return words.slice(0,50).join(' ') + '...';
        }
        return description;
    };

    const handleNext = () => {
        if (index + itemsPerPage < newsPictureRimData.length) {
            setIndex(index + itemsPerPage);
        }
    };

    const handlePrevious = () => {
        if (index - itemsPerPage >= 0) {
            setIndex(index - itemsPerPage);
        }
    };

    const getPageNumbers = (currentIndex, dataLength) => {
        const totalPages = Math.ceil(dataLength / itemsPerPage);
        const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;
        return { currentPage, totalPages };
    };

    const { currentPage, totalPages } =getPageNumbers(index, newsPictureRimData.length)

    const shareUrl = `https://readlanka.com/pictureRim/${pictureRimId}`;
    const currentURL = "https://readlanka.com" + window.location.pathname;
    // const shareUrl = "http://localhost:3000/read-book";
    const title = "Read Lanka";

    if (loading) {
        return <ScreenLoading />
    }

    return(
        <>
            <div className="top__bar" style={{background:bgColor}}>
                <p>
                    <FaCircleArrowLeft onClick={RedirectPage} style={{fontSize: "45px", margin: '3px', color: "white"}}/>
                </p>
            </div>
            <div className='main-outer-picture-rim'>
                <Helmet>
                    <title>{newsPictureRimIdData.title}</title>
                </Helmet>
                <div className='inner-top-outer-picture-rim' style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                    <div className='view-news-outer' style={{background: bookPageBackgroundColor}}>
                        <div style={{height: '30px'}}></div>
                        <div className="left-news-outer-pictureRim">
                            <img id="image" src={newsPictureRimIdData.thumbnail_url} alt=''
                                // style={{width:'100%', height:'300px'}}
                            />
                        </div>
                        <div className="right-news-desc-outer">
                            <div className='topic'>
                                <h2 style={{fontSize: '25px'}}>{newsPictureRimIdData.title}</h2>
                            </div>
                            <div className='news-description-body'>
                                <p style={{textAlign:'start'}}>{newsPictureRimIdData.description}</p>
                            </div>
                        </div>
                        <div className="Demo__container">
                            <p style={{fontSize: '30px', color: 'black'}}>share</p>
                            <div className="Demo__some-network">
                                <FacebookShareButton
                                    url={currentURL}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={30} round/>
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={currentURL}
                                    className="Demo__some-network__share-button"
                                >
                                    <TwitterIcon size={30} round/>
                                </TwitterShareButton>

                                <WhatsappShareButton
                                    url={currentURL}
                                    className="Demo__some-network__share-button"
                                >
                                    <WhatsappIcon size={30} round/>
                                </WhatsappShareButton>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:'30px'}}></div>
            <div className='inner-bottum-outer-picture-rim'>
                <div className="news-list" style={{userSelect: 'none'}}>
                    {newsPictureRimData.slice(index, index + itemsPerPage).map((newsItem, i) => (
                        <div className='news-outer'>
                            <div onClick={() => handleNewsClick(newsItem.pictureRimId)}
                                 className='left-news-outer-list'>
                                <img id="image" src={newsItem.thumbnail_url} alt="News" className="photo-item"/>
                            </div>
                            <div className='right-news-outer-picture-rim'>
                                <h2  onClick={() => handleNewsClick(newsItem.pictureRimId)}>{newsItem.title}</h2>
                                <br/>
                                <p>{truncateDescription(newsItem.description)} </p>
                                <button className='btn btn-default right-news-outer-picture-rim-btn'
                                        onClick={() => handleNewsClick(newsItem.pictureRimId)}>READ MORE
                                </button>
                            </div>
                            <div></div>
                        </div>
                    ))}
                </div>
                <div className='button-bottom-next'>
                    <div className="buttons">
                        <button onClick={handlePrevious} disabled={index === 0}><MdKeyboardDoubleArrowLeft/></button>
                        {currentPage}/{totalPages}
                        <button onClick={handleNext} disabled={index + 6 >= newsPictureRimData.length}>
                            <MdKeyboardDoubleArrowRight/>
                        </button>
                    </div>
                </div>
                <div style={{height: "50px"}}></div>
            </div>
            <Footer/>
        </>
    )
}
export default PictureRim
