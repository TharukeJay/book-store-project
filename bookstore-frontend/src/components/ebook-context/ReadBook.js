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
import {Navigate, useLocation} from "react-router-dom";
import {AiFillInstagram} from "react-icons/ai";
import {BsInstagram} from "react-icons/bs";
import {bgColor} from "../../common/commonColors";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Footer from "../footer/Footer";

const ReadBook = () => {
    const location = useLocation();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [usersData, setUsersData] = useState([]);

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
            setLoading(false)
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
            console.log('Selected comments Data:', selectedCommentData);
              setComments(selectedCommentData.commentList || []);
          }else{
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    const RedirectPage =()=>{
        window.location.href="/";
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
                    name: usersData.email,
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
                const getData = userResponse.data;
                setUsersData(getData.data);
                console.log('user data ==============>>>>:', usersData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getUsersForComments();
    },[])

    const shareUrl = `https://readlanka.com/read-book/${selectedBookId}`;
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

    if (loading) {
      return <ScreenLoading />
    }

    return (
      <>
        {/* <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px'}}/> */}
        <EbookTopBar/>
          <div style={{background: bgColor, height: 'auto'}}>
              <div className='view-novel-outer-ebook'>
                  <div className="left-photo-outer">
                      <img src={book.thumbnail_url} alt="Book Thumbnail"/>
                  </div>
                  <div className="right-desc-outer-ebook">
                      <br/><br/>
                      <p style={{color: "blue", fontSize: "45px", paddingBottom: "20px"}}>{book.title}</p>
                      <p>{book.description}</p>
                      <br/>

                      <div className="pricing-card">
                          <span>LKR {book.price} </span>
                      </div>
                      <div style={{height: "40px"}}></div>
                      <div className="read-button-outer">
                          <button><a href="/read-preview">Read preview</a></button>
                          {/*<button onClick={CheckoutBalnce}>*/}
                          {/*    Buy Now*/}
                          {/*</button> */}
                          <button><a
                              href={`/checkout-order?price=${book.price}&title=${encodeURIComponent(book.title)}`}> Buy
                              Now</a></button>
                      </div>
                      <div style={{height: "40px"}}></div>
                      <div className="Demo__container">
                          <div className="Demo__some-network">
                              <FacebookShareButton
                                  url={shareUrl}
                                  className="Demo__some-network__share-button"
                              >
                                  <FacebookIcon size={50} round/>
                              </FacebookShareButton>

                              <TwitterShareButton
                                  url={shareUrl}
                                  className="Demo__some-network__share-button"
                              >
                                  <TwitterIcon size={50} round/>
                              </TwitterShareButton>

                              <WhatsappShareButton
                                  url={shareUrl}
                                  className="Demo__some-network__share-button"
                              >
                                  <WhatsappIcon size={50} round/>
                              </WhatsappShareButton>

                          </div>
                      </div>
                  </div>
              </div>
              <div className="comments-section">
                  {comments.map((comment, index) => (
                      <div className="comments-list">
                          <div className="comment">
                              <div className="comment-header">
                                  {/*{data.map((uData, i) => (*/}
                                      <div className="comment-header-left">
                                          <p><RiAccountCircleFill style={{fontSize: '25px', color: 'yellowgreen'}}/> {comment.name}</p>
                                      </div>
                                  {/*))}*/}
                                  <div className="comment-header-right">
                                      <p style={{fontSize: '10px', color: 'yellowgreen'}}>
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
              <div className='comments-form-outer'>
                  <div className="comments-form">
                      <Form onSubmit={handleCommentSubmit}>
                          <InputGroup className="mb-3">
                              <Form.Control
                                  name='comment'
                                  value={formData.comment}
                                  onChange={handleChange}
                                  placeholder="Write a comment..."
                                  required
                              />
                              <Button variant="outline-secondary" type="submit" id="button-addon2"
                                      style={{border: '1px solid white', borderRadius: '8px', paddingTop: '-90px', marginLeft:'10px'}}>
                                  Post
                              </Button>
                          </InputGroup>
                      </Form>
                  </div>
              </div>
          </div>
          <Footer/>
      </>
    );
};

export default ReadBook

