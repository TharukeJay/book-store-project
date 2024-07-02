import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/ebookcontext.css';
import { FETCH_ALL_AUDIO_BOOK, FETCH_ALL_BOOK, FETCH_ALL_CATEGORY } from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';

const EBookContext = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [indexNext, setIndexNext] = useState(0);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showAllAudioBooks, setShowAllAudioBooks] = useState(false);
  const [audiobookData, setAudioBookData] = useState([]);
  const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndexNext(selectedIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
        const allBookData = response.data.data.filter(book => book.bookType === 'PDF');
        setBookData(allBookData);
        setFilteredBookData(allBookData);
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
        const otherCategories = Array.from(new Set(allCategoryData.data.map(categoryList => categoryList.categoryName)));
        setCategories(['All', ...otherCategories]);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCategoryData();
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
    let filteredBooks = bookData;
    if (category !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    if (searchTerm) {
      filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const SeeAllBook = () => {
    navigate("/details/all-books", { state: { type: 'book' } });
  }

  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const bookChunks = chunkArray(filteredBookData, 6);

  // Audio Book
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
        const allAudioBookData = response.data.data;
        setAudioBookData(allAudioBookData);
        setFilteredAudioBookData(allAudioBookData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handlePhotoClickAudio = (seriesId,audioItem) => {
    // localStorage.setItem('selectedSeriesAudioId', seriesId);
    navigate('/play-audio',{state: {audioSeries: audioItem}});
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

  const ShowAllBooks = () => {
    setShowAllBooks(true);
    setShowAllAudioBooks(false);
  }

  const ShowAllAudioBooks = () => {
    setShowAllBooks(false);
    setShowAllAudioBooks(true);
  }

  const audioBookChunks = chunkArray(filteredAudioBookData, 6);

  if (loading) {
    return <ScreenLoading />
  }

  return (
      <div className='outer'>
        <br />
        <div className="button-outer">
          <button className='btn btn-primary' onClick={ShowAllBooks}>Books</button>
          <button className='btn btn-primary' onClick={ShowAllAudioBooks}>Audio Book</button>
        </div>
        <br /><br />
        {showAllBooks && (
            <div>
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
                        style={{ margin: "5px" }}
                    >
                      {category}
                    </Button>
                ))}
              </div>
              <div className='title-outer'>
                <h2 style={{ color: "Blue" }}>Trending Now</h2>
                <button onClick={SeeAllBook}>See All</button>
              </div>
              <Carousel activeIndex={indexNext} onSelect={handleSelect}>
                {bookChunks.map((chunk, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="book-list">
                        {chunk.map((bookItem, i) => (
                            <div key={i} onClick={() => handlePhotoClick(bookItem.id)} className='photo'>
                              <img src={bookItem.thumbnail_url} alt={`Thumbnail of ${bookItem.title}`} />
                            </div>
                        ))}
                      </div>
                    </Carousel.Item>
                ))}
              </Carousel>
            </div>
        )}
        {showAllAudioBooks && (
            <div>
              <div className="ebook-search-outer">
                <Stack direction="horizontal" gap={3} className='search-outer'>
                  <Form.Control className="me-auto"
                                placeholder="Search by title..."
                                value={searchInput}
                                onChange={handleSearchInputChangeAudio}
                                onKeyPress={handleKeyPressAudio}
                  />
                  <Button variant="secondary" onClick={handleSearchSubmitAudio}>Submit</Button>
                </Stack>
              </div>
              <br />
              <div className="category-buttons">
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'primary' : 'secondary'}
                        onClick={() => handleAudioCategoryClick(category)}
                        className="btn btn-primary button"
                        style={{ margin: "5px" }}
                    >
                      {category}
                    </Button>
                ))}
              </div>
              <div className='title-outer'>
                <h2 style={{ color: "Blue" }}>Trending Now</h2>
                <button onClick={SeeAllBook}>See All</button>
              </div>
              <Carousel activeIndex={indexNext} onSelect={handleSelect}>
                {audioBookChunks.map((chunk, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="book-list">
                        {chunk.map((audioItem, i) => (
                            <div key={i} onClick={() => handlePhotoClickAudio(audioItem.id)} className='photo'>
                              <img src={audioItem.thumbnail_url} alt={`Thumbnail of ${audioItem.seriesTitle}`} />
                            </div>
                        ))}
                      </div>
                    </Carousel.Item>
                ))}
              </Carousel>
            </div>
        )}
      </div>
  );
};

export default EBookContext;
