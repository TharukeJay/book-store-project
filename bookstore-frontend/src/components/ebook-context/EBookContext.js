import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_BOOK, FETCH_ALL_CATEGORY} from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import Carousel from 'react-bootstrap/Carousel';
import {bgColor, seeAllBtn} from "../../common/commonColors";

const EBookContext = () => {
  const Navigate = useNavigate();
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
  const [indexNextAudio, setIndexNextAudio] = useState(0);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [hideAllBooks, setHideAllBooks] = useState(false);
  const [showAllAudioBooks, setShowAllAudioBooks] = useState(false);
  const [showAllFeatureBooks, setShowAllFeatureBooks] = useState(false);
  const [audiobookData, setAudioBookData] = useState([]);
  const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndexNext(selectedIndex);
  };
  const handleSelectAudio = (selectedIndex) => {
    setIndexNextAudio(selectedIndex);
  };

  useEffect(() => {
    console.log('Book Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
        const allBookData = response.data.data.filter(book => book.bookType === 'PDF');
        console.log('Book Data:==============>>>', allBookData);
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

  const handlePhotoClick = (id) => {
    localStorage.setItem('selectedBookId', id);
    Navigate(`/read-book/${id}`, { state: { selectedBookId: id } });
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

  const SeeAllBook = () => {
    navigate("/details/all-book", { state: { type: 'book' } });
  };

  const SeeAllAudioBook = () => {
    navigate("/details/all-book", { state: { type: 'audiobook' } });
  };

  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const bookChunks = chunkArray(filteredBookData, 3);


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
    navigate(`/play-audio/${seriesId}`, { state: { selectedSeriesAudioId: seriesId }});
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

  const audioBbookChunks = chunkArray(filteredAudioBookData, 2);

  const RedirectBooksPage = () =>{
        navigate("/details/all-book", { state: { type: 'book' } });
  }

  const RedirectAudioBooksPage = () =>{
    navigate("/details/all-book", { state: { type: 'audiobook' } });
  }

  if (loading) {
    return <ScreenLoading />
  }

  return (
      <div className='outer' style={{background:bgColor}}>
        <br/>
        <div className="">
          <button className='btn btn-primary' onClick={RedirectBooksPage}>Books</button>
          <button className='btn btn-primary' onClick={RedirectAudioBooksPage}>Audio Book</button>
        </div>
        <br/><br/>
        <div>
          <div className='title-outer'>
            <div className='left-ttle'>
              <h2 style={{color: " Blue"}}>Trending Books</h2>
            </div>
            <div className='right-btn'>
              <button onClick={SeeAllBook} style={{borderRadius: '10px', background: seeAllBtn, color: 'white'}}>See All
              </button>
            </div>
          </div>

          <Carousel activeIndex={indexNext} onSelect={handleSelect}>
            {bookChunks.map((chunk, idx) => (
                <Carousel.Item key={idx}>
                  <div className="book-list">
                    {chunk.map((bookItem, i) => (
                        <div key={i} onClick={() => handlePhotoClick(bookItem.id)}
                             className='photo'>
                          <img src={bookItem.thumbnail_url} alt={`Thumbnail of ${bookItem.title}`}/>
                        </div>
                    ))}
                  </div>
                </Carousel.Item>
            ))}
          </Carousel>

        </div>
        <div>
          <br/>
          <div className='title-outer'>
            <div className='left-ttle'>
              <h2 style={{color: " Blue"}}>Trending Audio Books</h2>
            </div>
            <div className='right-btn'>
              <button onClick={SeeAllAudioBook}
                      style={{borderRadius: '10px', background: seeAllBtn, color: 'white'}}>See
                All
              </button>
                </div>
              </div>

              <Carousel activeIndex={indexNextAudio} onSelect={handleSelectAudio}>
                {audioBbookChunks.map((chunk, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="book-list">
                        {chunk.map((audioBookItem, i) => (
                            <div key={i} onClick={() => handlePhotoClickAudio(audioBookItem.seriesId)}
                                 className='photo'>
                              <img src={audioBookItem.thumbnail_url} alt={`Thumbnail of ${audioBookItem.title}`}/>
                            </div>
                        ))}
                      </div>
                    </Carousel.Item>
                ))}
              </Carousel>

            </div>
        <br/>
      </div>
  )
}

export default EBookContext
