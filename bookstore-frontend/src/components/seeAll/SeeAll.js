import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  {FETCH_ALL_BOOK, FETCH_ALL_CATEGORY, FETCH_ALL_AUDIO_BOOK}  from '../../apis/endpoints.js';
import Stack from 'react-bootstrap/Stack';
import NavBar from '../navbar/NavBar.js';
import Footer from '../footer/Footer.js';
// import '../../styles/ebookcontext.css';

const SeeAll = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [index, setIndex] = useState(0); 
  const [searchInput, setSearchInput] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [hideAllBooks, setHideAllBooks] = useState(false);
  const [showAllAudioBooks, setShowAllAudioBooks] = useState(false);
  const [showAllFeatureBooks, setShowAllFeatureBooks] = useState(false);
  const [audiobookData, setAudioBookData] = useState([]);
  const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);

  //  Pdf book -------
  useEffect(() => {
    console.log('Book Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
        const allBookData = response.data.data.filter(book => book.bookType === 'PDF');
        console.log('Book Data:', allBookData);
        setBookData(allBookData);
        setFilteredBookData(allBookData);
        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  const handlePhotoClick = (id) => {
    localStorage.setItem('selectedBookId', id);
    navigate('/read-book');
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredBookData(bookData);
    } else {
      setFilteredBookData(bookData.filter(book => book.category === category));
    }
  };

  const filterBooks = (category, searchTerm) => {
    // let filteredBooks = bookData.filter(book => book.categoryType === 'Pdf');
    let filteredBooks = bookData;

    if (category !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    if (searchTerm) {
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log("filteredBooks=================", filteredBooks);
    }
    setFilteredBookData(filteredBooks);
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
  console.log('Audio Book Data:', filteredAudioBookData);

  const handlePhotoClickAudio = (seriesId) => {
    localStorage.setItem('selectedSeriesAudioId', seriesId);
    navigate('/play-audio');
  }; 

  const handleAudioCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
        setFilteredAudioBookData(audiobookData);
    } else {
      setFilteredAudioBookData(audiobookData.filter(audio => audio.category === category));
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

  //  Category -------
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

  const ShowAllBooks = async() =>{
    setShowAllBooks(!showAllBooks);
    setShowAllAudioBooks(false);
    setShowAllFeatureBooks(false);
  }
  const ShowAllAudioBooks = async() =>{
    setShowAllBooks(false);
    setShowAllAudioBooks(!showAllAudioBooks);
    setShowAllFeatureBooks(false);
    setHideAllBooks(false);
  }
  const ShowAllFeatureBooks = async() =>{
    setShowAllBooks(false);
    setShowAllAudioBooks(false);
    setShowAllFeatureBooks(!showAllFeatureBooks);
  }

  return (
    <>
      <NavBar/>
      <div className="button-outer">
          <button className='btn btn-primary' onClick={ShowAllBooks}>Books</button>
          <button className='btn btn-primary' onClick={ShowAllAudioBooks}>Audio Book</button>
          <button className='btn btn-primary' onClick={ShowAllFeatureBooks}>Feature</button>
        </div>

      <div className='outer' >
        <br /><br />
        {showAllBooks &&(
          <div>
        <div className="ebook-search-outer">
          <Stack direction="horizontal" gap={3} className='search-outer'>
            <Form.Control className="me-auto" 
              placeholder="Search by title..."
              value={searchInput}
              onChange={handleSearchInputChange} 
              onKeyPress={handleKeyPress}
            />
            <Button variant="secondary"  onClick={handleSearchSubmit} className="btn btn-primary search-button">Submit</Button>
          </Stack>
        </div>
        <div className="category-buttons">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            onClick={() => handleCategoryClick(category)}
            className="btn btn-primary button"
            style={{margin:"5px"}}
          >
            {category}
          </Button>
        ))}
        <div className="see-all-books">
          <h2>All Books</h2>
          <div className="book-list">
            {filteredBookData.map((bookItem, i) => (
              <div key={i} onClick={() => handlePhotoClick(bookItem.id)} className='photo'>
                <img src={bookItem.thumbnail_url} alt={`Thumbnail of ${bookItem.title}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
        )}

        {showAllAudioBooks &&(
          <div>
            <div className="ebook-context-outer">
              <Stack direction="horizontal" gap={3} className='search-outer'>
                <Form.Control className="me-auto" 
                  placeholder="Search by title..."
                  value={searchInput}
                  onChange={handleSearchInputChangeAudio} 
                  onKeyPress={handleKeyPressAudio}
                />
                <Button variant="secondary"  onClick={handleSearchSubmitAudio}>Submit</Button>
              </Stack>
            </div>
            <br />
            <div className="category-buttons">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'secondary'}
                  className="btn btn-primary"  style={{margin:"5px"}}
                  onClick={() => handleAudioCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="book-list">
            {filteredAudioBookData && filteredAudioBookData.slice(index, index + 4).map((audioBookItem, i) => (
                <div key={i} onClick={() => handlePhotoClickAudio(audioBookItem.seriesId)} className='photo'>
                  <img src={audioBookItem.thumbnail_url}alt={`Thumbnail of ${audioBookItem.seriesTitle}`} />
                  <h4>{audioBookItem.seriesTitle}</h4>
                </div>
              ))}
          </div>
          </div>
        )}
        <br />
      </div>
      <Footer/>
    </>
  )
}

export default SeeAll
