import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_ENDPOINT from '../../apis/httpAxios';
import {FETCH_ALL_BOOK, FETCH_ALL_AUDIO_BOOK, FETCH_ALL_CATEGORY} from '../../apis/endpoints.js';
import ScreenLoading from '../loading/Loading';
import {SlArrowLeftCircle} from "react-icons/sl";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import {FcNext, FcPrevious} from "react-icons/fc";
import '../../styles/ebookcontext.css';
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import {bgColor} from "../../common/commonColors";

const SeeAllPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const [bookData, setBookData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryData, setCategoryData] = useState([]);
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [indexNext, setIndexNext] = useState(0);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [hideAllBooks, setHideAllBooks] = useState(false);
  const [showAllAudioBooks, setShowAllAudioBooks] = useState(false);
  const [showAllFeatureBooks, setShowAllFeatureBooks] = useState(false);
  const [audiobookData, setAudioBookData] = useState([]);
  const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);
  const [audioIndex, setAudioIndex] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === 'book') {
          response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
          const allBookData = response.data.data.filter(book => book.bookType === 'PDF');
          setBookData(allBookData);
          setFilteredBookData(allBookData);
        } else if (type === 'audiobook') {
          const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
          console.log('Audio Data Execute Midle', response);
          const allAudioBookData = response.data.data;
          console.log('allAudioBookData===========>>', allAudioBookData);
          setAudioBookData(allAudioBookData);
          setFilteredAudioBookData(allAudioBookData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_CATEGORY);
        const allCategoryData = response.data;
        console.log('Category Data:', allCategoryData);
        const otherCategories = Array.from(new Set(allCategoryData.data.map(categoryList => categoryList.categoryName)));
        setCategories(['All', ...otherCategories]);

        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCategoryData();
  },[]);

  const handleCategoryClick = (category) => {
    if (type === 'book') {
      setSelectedCategory(category);
      if (category === 'All') {
        setFilteredBookData(bookData);
      } else {
        setFilteredBookData(bookData.filter(book => book.category === category));
      }
    }else{
      setSelectedCategory(category);
      if (category === 'All') {
        setFilteredAudioBookData(audiobookData);
      } else {
        setFilteredAudioBookData(audiobookData.filter(audio => audio.category === category));
      }
    }

  };

  const filterBooks = (category, searchTerm) => {
    if (type === 'book') {
      let filteredBooks = bookData;

      if (category !== 'All') {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }
      if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log("filteredBooks=================", filteredBooks);
      }
      setFilteredBookData(filteredBooks);
    }else{
      let filteredBooks = audiobookData;

      if (category !== 'All') {
        filteredBooks = filteredBooks.filter(audio => audio.category === category);
      }
      if (searchTerm) {
        filteredBooks = filteredBooks.filter(audio =>
            audio.seriesTitle && audio.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      setFilteredAudioBookData(filteredBooks);
    }

  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterBooks(selectedCategory, searchInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  const handleNext = () => {
    if (index + itemsPerPage  < filteredBookData.length) {
      setIndex(index + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (index -itemsPerPage  >= 0) {
      setIndex(index - itemsPerPage );
    }
  };

  const handleAudioNext = () => {
    if (audioIndex + itemsPerPage  < filteredAudioBookData.length) {
      setAudioIndex(audioIndex + itemsPerPage );
    }
  };

  const handleAudioPrevious = () => {
    if (audioIndex - itemsPerPage  >= 0) {
      setAudioIndex(audioIndex - itemsPerPage );
    }
  };

  const handlePhotoClick = (id) => {
    if (type === 'book') {
      // localStorage.setItem('selectedBookId', id);
      navigate(`/read-book/${id}`,{ state: { selectedBookId: id } });
    } else if (type === 'audiobook') {
      // localStorage.setItem('selectedSeriesAudioId', id);
      navigate(`/play-audio/${id}`, { state: { selectedSeriesAudioId: id } });
    }
  };

  const RedirectPage =() => {
    if (type === 'book') {
      navigate('/');
    } else if (type === 'audiobook') {
      navigate('/');
    }
  }

  const getPageNumbers = (currentIndex, dataLength) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;
    return { currentPage, totalPages };
  };

  const { currentPage, totalPages } = type === 'book'
      ? getPageNumbers(index, filteredBookData.length)
      : getPageNumbers(audioIndex, filteredAudioBookData.length);

  if (loading) {
    return <ScreenLoading />;
  }

  return (
      <div>
        <NavBar style={{display: 'fixed'}}/>
        <div className="top__bar">
          <p>
            <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize: "40px", margin: '10px', color: "white"}}/>
          </p>
        </div>

        <div className='outer' style={{background: bgColor}}>
          <br/><br/>

          <div className="ebook-search-outer">
            <Stack direction="horizontal" gap={3} className='search-outer'>
              <Form.Control className="me-auto"
                  placeholder="Search by title..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
              />
              <Button variant="secondary" onClick={handleSearchSubmit}
                      className="btn btn-primary search-button">Submit</Button>
            </Stack>
          </div>
          <br/>

          <div className="category-buttons">
            {categories.map(category => (
                <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'secondary'}
                    onClick={() => handleCategoryClick(category)}
                    className="btn btn-primary button"
                    style={{margin: "5px"}}
                >
                  {category}
                </Button>
            ))}
          </div>

          <div style={{height: '100px'}}></div>

          <div className="gallery-container">
            {type === 'book' && (
                <>
                  <div className="book-list">
                    {filteredBookData.slice(index, index + itemsPerPage).map(item => (
                        <div key={item.id} onClick={() => handlePhotoClick(item.id)} className='photo'>
                          <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
                        </div>
                    ))}
                  </div>

                  <div className="buttons">
                    <button onClick={handlePrevious} disabled={index === 0}><FcPrevious/></button>
                    <span>{currentPage} {currentPage + 1} {currentPage + 2}...</span>
                    <button onClick={handleNext} disabled={index + itemsPerPage >= filteredBookData.length}><FcNext/>
                    </button>
                  </div>
                </>
            )}

            {type === 'audiobook' && (
                <>
                  <div className="book-list">
                    {filteredAudioBookData.slice(audioIndex, audioIndex + itemsPerPage).map(item => (
                        <div key={item.id} onClick={() => handlePhotoClick(item.seriesId)} className='photo'>
                          <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
                        </div>
                    ))}
                  </div>
                  <div className="buttons">
                    <button onClick={handleAudioPrevious} disabled={audioIndex === 0}><FcPrevious/></button>
                    <span>{currentPage} {currentPage + 1} {currentPage + 2}...</span>
                    <button onClick={handleAudioNext}
                            disabled={audioIndex + itemsPerPage >= filteredAudioBookData.length}>
                      <FcNext/></button>
                  </div>
                </>
            )}
          </div>
        </div>
        <Footer/>
      </div>
  );
};

export default SeeAllPage;
