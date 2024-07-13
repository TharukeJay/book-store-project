import React from 'react'
import { useState,useEffect, useRef } from 'react';
import {
  FETCH_ALL_AUDIO_BOOK,
  FETCH_ALL_BOOK_SERIES_ID,
  FETCH_ALL_READ_BOOK,
  FETCH_LISTNING_AUDIO, GET_COMMENTS_AUDIO, GET_USER_DATA, SET_COMMENTS_AUDIO,
  SET_LISTNING_AUDIO
} from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { useNavigate, useLocation  } from 'react-router-dom';
import DisplayTrack from './DisplayTrack';
import Controls from './Controles';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';
import {
  FacebookShareButton,
  FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon,
} from "react-share";
import {bgColor} from "../../common/commonColors";
import Footer from "../footer/Footer";
import {RiAccountCircleFill} from "react-icons/ri";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import '../../styles/audio.css'

const AudioPlayer  = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bookData, setBookData] =useState([]);
  const [seriesBookData, setSeriesBookData] =useState('');
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackId, setSelectedTrackId]= useState("");
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };
  const { selectedSeriesAudioId } = location.state;
  const selectedBookId = selectedSeriesAudioId;
  const userId = localStorage.getItem('userId');

  const fetchLastPlayedTrackIndex = async () => {
    try {
      const response = await API_ENDPOINT.get(${FETCH_LISTNING_AUDIO}/${userId}_${selectedBookId});
      if (response.status === 200) {
        return response.data.data;
      }
      console.log("fetchLastPlayedTrackIndex =============>>>", response.data);
    } catch (error) {
      console.error('Error fetching last played track index:', error);
    }
    return { lastPlayedTrackIndex: 0, selectedAudioId: "" };
  };

  useEffect(() => {
      // console.log('selected Book Data Execute start');
      const fetchData = async () => {
        try {
          const response = await API_ENDPOINT.get(${FETCH_ALL_BOOK_SERIES_ID}/${selectedBookId});
          if (response.status == 200) {
            const selectedBookData = response.data.data;
            // console.log('Selected Book Data for Id new:', selectedBookData);
            setBookData(selectedBookData);
            setLoading(false)
            
            const updatedTracks = selectedBookData.map(book => ({
              id: book.id,
              title: book.title,
              src: book.bookFile_url["fullBookUrl"],
              authorName: book.authorName,
              thumbnail_url: book.thumbnail_url,
              description: book.description,
            }));
            setTracks(updatedTracks);
            // setCurrentTrack(updatedTracks[0]);
            // setTrackIndex(0);

            const lastPlayedData = await fetchLastPlayedTrackIndex();
            const lastPlayedTrackIndex = lastPlayedData.lastPlayedTrackIndex;
            const lastPlayedAudioId = lastPlayedData.selectedAudioId;

            setTrackIndex(lastPlayedTrackIndex);
            setCurrentTrack(updatedTracks[lastPlayedTrackIndex]);
            setSelectedTrackId(lastPlayedAudioId);
          }else{
            window.location.href="/login"
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);

  useEffect(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    }, [currentTrack, isPlaying]);

  // useEffect(() => {
    const saveProgress = async () => {
      try {
        await API_ENDPOINT.post(SET_LISTNING_AUDIO, {
          userId: userId,
          seriesAudioId: selectedBookId,
          selectedAudioId: selectedTrackId,
          lastPlayedTrackIndex: trackIndex,
        });
        console.error('success');
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    };
  // }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', saveProgress);
    return () => {
      window.removeEventListener('beforeunload', saveProgress);
      saveProgress();
    };
  }, [trackIndex, selectedTrackId]);

  const handlePhotoClick = (id) => {
      localStorage.setItem('selectedAudioId', id);
      setSelectedTrackId(id);
    }; 

  const selectedAudioId = localStorage.getItem('selectedAudioId');

  // useEffect(() => {
  //   console.log('selected Book Data Execute start');
  //   const fetchSeriesData = async () => {
  //     try {
  //       const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
  //       const allAudioBookData = response.data.data;
  //       console.log('allAudioBookData===============>>>', allAudioBookData);
  //       const filteredData = allAudioBookData.filter(book => book.seriesId === selectedBookId);
  //       setSeriesBookData(filteredData);
  //       console.log('setSeriesBookData data===============>>>', filteredData);
  //       console.log('setSeriesBookData description===============>>>', seriesBookData);
  //
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchSeriesData();
  // }, []);
    
  useEffect(() => {
      const fetchAudioData = async () => {
        try {
            let tracId = tracks.find((element) => element.id === selectedTrackId)
            console.log("trackId ====> ", tracId);
            setCurrentTrack(tracId);
            setLoading(false);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      if (selectedAudioId) {
        fetchAudioData();
      }
    }, [selectedAudioId]);

  useEffect(() =>{
    const getUsersForComments = async () =>{
      try {
        const userResponse = await API_ENDPOINT.get(${GET_USER_DATA}/${userId});
        const getData = userResponse.data;
        setUsersData(getData.data);
        console.log('user data ==============>>>>:',usersData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getUsersForComments();
  },[])

  const commentData = async () => {
    try {
      const response = await API_ENDPOINT.get(${GET_COMMENTS_AUDIO}/${selectedBookId});
      if (response.status == 200) {
        const selectedSeriesData = response.data.data;
        console.log('Selected series Data:', selectedSeriesData);
        setSeriesData(selectedSeriesData);
        setComments(selectedSeriesData.commentList || []);
        setLoading(false);
        console.log('Selected comments :', comments);
        // console.log('selectedCommentData=====================>>>> :', selectedCommentData);
        // console.log('seriesData=====================>>>> :', seriesData);
      }else{
        console.log('No comments');
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
      await API_ENDPOINT.post(SET_COMMENTS_AUDIO, {
        formData,
        userId: userId,
        seriesId: selectedBookId,
        name: usersData.email,
      });
      setFormData({ comment: "" });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  useEffect(() => {
    commentData();
  }, []);

  const HandleCheckout =() => {
    Navigate(/checkout-order?AudioBookid=${selectedBookId}, { state: { type: "audio" } })
  }

  // const shareUrl = "http://github.com";
  const shareUrl = https://readlanka.com/play-audio/${selectedBookId};
  const title = "#Read Lanka";

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();

  }
    return (
        <>
          <TopBar/>
          <div className="main-outer-audio" style={{background: bgColor}}>
            <div className="left-audio-outer">
              <div className="audio-player">
                <div className="inner">
                  <DisplayTrack
                      {...{
                        currentTrack,
                        audioRef,
                        setDuration,
                        progressBarRef,
                        handleNext,
                      }}
                  />
                  <ProgressBar
                      {...{progressBarRef, audioRef, timeProgress, duration}}
                  />
                  <Controls
                      {...{
                        audioRef,
                        progressBarRef,
                        duration,
                        setTimeProgress,
                        tracks,
                        trackIndex,
                        setTrackIndex,
                        setCurrentTrack,
                        isPlaying,
                        setIsPlaying,
                        handleNext,
                      }}
                  />

                </div>
              </div>
            </div>

            <div className="right-desc-outer">
              <h3 style={{color: 'blue'}}>{seriesData.seriesTitle}</h3>
              <div style={{height: "10px"}}></div>
              <div className="audio-book-list">
                {bookData.sort((a, b) => a.chapter - b.chapter).map((audioBookItem, i) => (
                    <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='right-photo'>
                      <img src={audioBookItem.thumbnail_url} alt={Thumbnail of ${audioBookItem.seriesTitle}}/>
                      <p>{audioBookItem.title}</p>
                    </div>
                ))}
              </div>
              <div style={{height: "20px"}}></div>
              {/<div className="audio-description" >/}
              <p style={{fontSize: '15px'}}> {seriesData.description} </p>
              {/</div>/}
              <div className="pricing-card">
                <span> {seriesData.seriesPrice} /- LKR </span>
              </div>
              {/))}/}

              {/<div style={{height: "40px"}}></div>/}

              <div className="read-button-outer">
              {/*  <button><a*/}
              {/*      href={/checkout-order?AudioBookid=${selectedBookId}}> Buy*/}
              {/*    Now</a></button>*/}
              {/</div>/}
              <button onClick={HandleCheckout}><a> Buy Now</a></button>
              </div>

              <div style={{height: "10px"}}></div>

              <div className="Demo__container">
                <p style={{fontSize: "20px", marginLeft:"50px"}}> Share</p>
                <div className="Demo__some-network">
                  <FacebookShareButton
                      url={shareUrl}
                      htmlTitle={title}
                      className="Demo_some-network_share-button"
                  >
                    <FacebookIcon size={30} round/>
                  </FacebookShareButton>
                  <TwitterShareButton
                      url={shareUrl}
                      className="Demo_some-network_share-button"
                  >
                    <TwitterIcon size={30} round/>
                  </TwitterShareButton>

                  <WhatsappShareButton
                      url={shareUrl}
                      className="Demo_some-network_share-button"
                  >
                    <WhatsappIcon size={30} round/>
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
                      <div className="comment-header-left">
                        <p style={{fontSize: '10px', color: 'black'}}><RiAccountCircleFill style={{fontSize: '25px', color: 'yellowgreen'}}/> {comment.name}</p>
                      </div>
                      <div className="comment-header-right">
                        <p style={{fontSize: '10px', color: 'black'}}>
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="comment-descriptions">
                      <p>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          <div className="comments-form-outer">
              <div className="comments-form">
                <Form onSubmit={handleCommentSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                      name='comment'
                      value={formData.comment}
                      onChange={handleChange}
                      style={{border:'1px solid blue'}}
                      placeholder="Write a comment..."
                      required
                  />
                  <Button variant="outline-secondary" type="submit" id="button-addon2"
                          style={{border: '1px solid black', borderRadius: '8px', marginLeft:'10px', paddingTop: '-90px'}}>
                    Post
                  </Button>
                </InputGroup>
              </Form>
             </div>
            </div>
          <Footer/>
        </>
    );
};

export default AudioPlayer