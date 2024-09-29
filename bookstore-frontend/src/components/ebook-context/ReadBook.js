import React from 'react'
import '../../styles/ebookcontext.css'
import { useState, useEffect } from 'react';
import {FETCH_ALL_READ_BOOK, GET_COMMENTS, GET_USER_DATA, SET_COMMENTS, SET_LISTNING_AUDIO} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'
import { SlArrowLeftCircle } from "react-icons/sl";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    InstapaperShareButton,
    InstapaperIcon,
} from "react-share";
import { RiAccountCircleFill } from "react-icons/ri";
import EbookTopBar from '../ebook-context/EbbokTopBar';
import {useNavigate, useLocation} from "react-router-dom";
import {AiFillInstagram} from "react-icons/ai";
import {BsInstagram} from "react-icons/bs";
import {bgColor, buyNowButton, readButton} from "../../common/commonColors";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Footer from "../footer/Footer";
import {Helmet} from "react-helmet-async";

const ReadBook = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [pdfBookDataId, setPdfBookDataId] =useState([]);

    const selectedBookId = localStorage.getItem('selectedBookId');
    const userId = localStorage.getItem('userId');
    // const {selectedBookId} = location.state;
    console.log('selectedBookId===================>>>', selectedBookId);

    const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK}/${selectedBookId}`);
          if (response.status == 200) {
            const selectedBookData = response.data.data;
            console.log('Selected Book Data:', selectedBookData);
            setBook(selectedBookData);
            setLoading(false);
          }else{
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const commentData = async () => {
        try {
          const response = await API_ENDPOINT.get(`${GET_COMMENTS}/${selectedBookId}`);
          if (response.status == 200) {
            const selectedCommentData = response.data.data;
            console.log(' comments Data:', selectedCommentData);
              setComments(selectedCommentData.commentList || []);
            console.log('Selectedcomments Data:', comments);
          }else{
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const RedirectPage =()=>{
        window.location.href="/home";
    }

    const [formData, setFormData] = useState({
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    console.log('newComment ===================>>>>>', formData)
    };

    const handleCommentSubmit = async(e) => {
        e.preventDefault();
            try {
                await API_ENDPOINT.post(SET_COMMENTS, {
                    formData,
                    userId: userId,
                    bookId: selectedBookId,
                    name: usersData.userName,
                });
                setFormData({ comment: "" });
                console.log('usersData.email======>>>:', usersData.email);
            } catch (error) {
                console.error('Error saving progress:', error);
            }
    }

    useEffect(() => {
        fetchData();
        commentData();
    }, []);

    useEffect(() =>{
        const getUsersForComments = async () =>{
            try {
                const userResponse = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
                const getData = userResponse.data.data;
                setUsersData(getData);
                setPdfBookDataId(getData.purchaseBookListPDF|| []);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getUsersForComments();
    },[])

    const shareUrl = `https://readlanka.com/read-book/${selectedBookId}`;
    const currentURL = "https://readlanka.com" + window.location.pathname;
    const title = "Read Lanka";

    // const CheckoutBalnce = () => {
    //     window.location.href="/checkout-order";
    // }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Adjust to your preferred date and time format
    }

    const truncateDescription = (description) => {
        if (!description) {
            return '';
        }
        const words = description.split(' ');
        if (words.length > 60) {
            return words.slice(0,100).join(' ') + '...';
        }
        return description;
    };


    const HandleCheckoutBook =() => {
        Navigate(`/checkout-order?id=${selectedBookId}`, { state: { type: "book" , BookDataId:pdfBookDataId} })
    }

    if (loading) {
      return <ScreenLoading />
    }

    return (
      <>
        {/* <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px'}}/> */}
        <EbookTopBar/>
          <div style={{background: bgColor, height: 'auto'}}>
              <Helmet>
                  <title>{book.title}</title>
              </Helmet>
              <div className='view-novel-outer-ebook'>
                  <div className="left-photo-outer">
                      <img id="image" src={book.thumbnail_url} alt="Book Thumbnail"/>
                  </div>
                  <div className="right-desc-outer-ebook">
                      <br/><br/>
                      <p style={{color: "blue", fontSize: "40px", paddingBottom: "10px", fontWeight:'900'}}>{book.title}</p>
                      <p style={{fontSize: "20px", paddingBottom: "1px" , color:'white'}}>{book.description}</p>
                      <br/>

                      <div className="pricing-card">
                          <span> {book.price}/- LKR </span>
                      </div>
                      <div style={{height: "10px"}}></div>
                      <div className="read-button-outer">
                          <button style={{background: readButton}}><a href="/read-preview">Read preview</a></button>
                          <button onClick={HandleCheckoutBook} style={{background: buyNowButton}}><a
                              style={{color: 'white'}}> Buy Now</a></button>
                      </div>
                      <div style={{height: "20px"}}></div>
                      <div className="Demo__container">
                          <p style={{marginLeft: '50px', color:'white'}}> share </p>
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
              {/*<h3 style={{color:'blue', textAlign:'center'}}> Mirror Wall</h3>*/}
              <div className='mirror-wall'>
                  <img id="image"
                       src='https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/temp%2Fmirror%20wall.jpeg?alt=media&token=5387365f-682b-45e9-a7b6-db017190cf44'
                       alt="Mirror Wall"/>
              </div>
              <div className="comments-section" style={{background: bgColor, height: 'auto'}}>
                  {comments.map((comment, index) => (
                      <div className="comments-list">
                          <div className="comment">
                              <div className="comment-header">
                                  {/*{data.map((uData, i) => (*/}
                                  <div className="comment-header-left">
                                      <p style={{fontSize: '15px', color: 'black'}}><RiAccountCircleFill
                                          style={{fontSize: '25px', color: 'yellowgreen'}}/> {comment.name}</p>
                                  </div>
                                  {/*))}*/}
                                  <div className="comment-header-right">
                                      <p style={{fontSize: '15px', color: 'black'}}>
                                          {formatDate(comment.createdAt)}
                                      </p>
                                  </div>
                              </div>
                              <div className="comment-descriptions">
                                  <p>
                                      {/*{truncateDescription(comment.comment)}*/}
                                      {comment.comment}
                                  </p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
              <div className='comments-form-outer' style={{backgroundColor:bgColor}}>
                  <div className="comments-form">
                      <Form onSubmit={handleCommentSubmit}>
                          <InputGroup className="mb-3">
                              <Form.Control
                                  name='comment'
                                  value={formData.comment}
                                  onChange={handleChange}
                                  placeholder="Write a comment..."
                                  style={{border: '1px solid red', height:'40px', fontSize:'18px'}}
                                  required
                              />
                              <Button variant="outline-secondary" type="submit" id="button-addon2"
                                      style={{
                                          border: '1px solid red',
                                          borderRadius: '8px',
                                          paddingTop: '-90px',
                                          marginLeft: '10px',
                                          color: 'white',
                                          fontSize:'16px',
                                          // backgroundColor:'red'
                                      }}>
                                  Post
                              </Button>
                          </InputGroup>
                      </Form>
                  </div>
              </div>
              <div style={{height: "40px"}}></div>
          </div>
          <Footer/>
      </>
    );
};

export default ReadBook

