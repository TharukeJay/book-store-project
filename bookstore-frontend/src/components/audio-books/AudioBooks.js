import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/audio.css';
import { FETCH_ALL_AUDIO_BOOK, FETCH_ALL_BOOK, FETCH_ALL_CATEGORY } from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import {bgColor, seeAllBtn} from "../../common/commonColors";
import { IoSearchOutline } from "react-icons/io5";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from "react-icons/md";

const AudioBooks = () => {
  const navigate = useNavigate();
  // const [bookData, setBookData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [indexNext, setIndexNext] = useState(0);
  const [indexNextAudio, setIndexNextAudio] = useState(0);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [hideAllBooks, setHideAllBooks] = useState(false);
  const [showAllAudioBooks, setShowAllAudioBooks] = useState(false);
  const [showAllFeatureBooks, setShowAllFeatureBooks] = useState(false);
  const [audiobookData, setAudioBookData] = useState([]);
  const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);
  const itemsPerPage = 6;


  //  Audio Book
  useEffect(() => {
    console.log('Audio Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
        console.log('Audio Data Execute Midle', response);
        const allAudioBookData = response.data.data;
        console.log('allAudioBookData===========>>', allAudioBookData);
        setAudioBookData(allAudioBookData);
        setFilteredAudioBookData(allAudioBookData);
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    filterAudio(selectedCategory, searchInput);
  }, [searchInput, selectedCategory]);

  const handlePhotoClickAudio = (seriesId) => {
    localStorage.setItem('selectedSeriesAudioId', seriesId);
    navigate(`/play-audio/${seriesId}`, { state: { selectedSeriesAudioId: seriesId }});
  };

  const handleSelectAudio = (selectedIndex) => {
    setIndexNextAudio(selectedIndex);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredAudioBookData(audiobookData);
    } else {
      setFilteredAudioBookData(audiobookData.filter(book => book.category === category));
    }
  };

  const filterAudio = (category, searchTerm) => {
    let filteredBooks = audiobookData;

    if (category !== 'All') {
      filteredBooks = filteredBooks.filter(audio => audio.category === category);
    }
    if (searchTerm) {
      filteredBooks = filteredBooks.filter(audio =>
          audio.seriesTitle && audio.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredAudioBookData(filteredBooks);
  };

  const handleSearchInputChangeAudio = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmitAudio = (event) => {
    event.preventDefault();
    filterAudio(selectedCategory, searchInput);
  };

  const handleKeyPressAudio = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmitAudio(event);
    }
  };

  const handleNext = () => {
    if (index + itemsPerPage < audiobookData.length) {
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

  const { currentPage, totalPages } =getPageNumbers(index, audiobookData.length)

  if (loading) {
    return <ScreenLoading />
  }

  return (
      <div className='outer' style={{background: bgColor}}>
        <br/>
        <div className="ebook-search-outer">
          <Stack direction="horizontal" gap={3} className='search-outer'>
            <Form.Control className="me-auto"
                          placeholder="Search by title..."
                          value={searchInput}
                          onChange={handleSearchInputChangeAudio}
                          onKeyPress={handleKeyPressAudio}
                          style={{border:'1px solid blue'}}
            />
            <Button variant="secondary" onClick={handleSearchSubmitAudio}
                    className="btn btn-primary search-button"><IoSearchOutline style={{color:'white'}}/></Button>
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
                  // style={{margin: "5px", borderRadius:'15px'}}
              >
                {category}
              </Button>
          ))}
        </div>

        <div style={{height: '60px'}}></div>
        <div className="gallery-container">
          <>
            <div className="book-list">
              {filteredAudioBookData.slice(index, index + itemsPerPage).map(item => (
                  <div key={item.seriesId} onClick={() => handlePhotoClickAudio(item.seriesId)} className='photo'>
                    <img id="image" src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
                  </div>
              ))}
            </div>

            <div className="buttons">
              <button onClick={handlePrevious} disabled={index === 0}><MdKeyboardDoubleArrowLeft/></button>
              {currentPage}/{totalPages}
              <button onClick={handleNext} disabled={index + 6 >= audiobookData.length}><MdKeyboardDoubleArrowRight/>
              </button>
            </div>
          </>
        </div>
        <br/>
      </div>
  );
};

export default AudioBooks;
