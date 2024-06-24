import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_ENDPOINT from '../../apis/httpAxios';
import {FETCH_ALL_BOOK, FETCH_ALL_AUDIO_BOOK, FETCH_ALL_CATEGORY} from '../../apis/endpoints.js';
import ScreenLoading from '../loading/Loading';
import {SlArrowLeftCircle} from "react-icons/sl";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

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

  if (loading) {
    return <ScreenLoading />;
  }

  // useEffect(() => {
    console.log('Category Data Execute start');
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
  // }, []);

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
    if (index + 14 < filteredBookData.length) {
      setIndex(index + 14);
    }
  };

  const handlePrevious = () => {
    if (index - 14 >= 0) {
      setIndex(index - 14);
    }
  };

  const handlePhotoClick = (id) => {
    if (type === 'book') {
      localStorage.setItem('selectedBookId', id);
      navigate('/read-book');
    } else if (type === 'audiobook') {
      localStorage.setItem('selectedSeriesAudioId', id);
      navigate('/play-audio');
    }
  };

  const RedirectPage =() => {
    if (type === 'book') {
      navigate('/');
    } else if (type === 'audiobook') {
      navigate('/');
    }
  }

  return (
      <div>
        <div className="top__bar">
          <p>
            <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize: "40px", margin: '10px', color: "white"}}/>
          </p>
        </div>
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
        <h2>{type === 'book' ? 'All Books' : 'All Audiobooks'}</h2>
        <div className="book-list">
          {filteredBookData.map(item => (
              <div key={item.id} onClick={() => handlePhotoClick(item.id)} className='photo'>
                <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
              </div>
          ))}
        </div>
        <div className="book-list">
          {filteredAudioBookData.map(item => (
              <div key={item.id} onClick={() => handlePhotoClick(item.seriesId)} className='photo'>
                <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
              </div>
          ))}
        </div>
      </div>
  );
};

export default SeeAllPage;
