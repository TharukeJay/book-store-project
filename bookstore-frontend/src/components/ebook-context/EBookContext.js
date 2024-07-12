import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_BOOK, FETCH_ALL_CATEGORY} from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import {bgColor, seeAllBtn} from "../../common/commonColors";
import { IoSearchOutline } from "react-icons/io5";
import {MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight} from "react-icons/md";

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
  const itemsPerPage = 6;

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

  useEffect(() => {
    filterBooks(selectedCategory, searchInput);
  }, [searchInput, selectedCategory]);

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
    if (index + itemsPerPage < bookData.length) {
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

  const { currentPage, totalPages } =getPageNumbers(index, bookData.length)

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
                          onChange={handleSearchInputChange}
                          style={{border:'1px solid blue'}}
                          onKeyPress={handleKeyPress}
            />
            <Button variant="secondary" onClick={handleSearchSubmit}
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
                  style={{margin: "5px", borderRadius:'15px'}}
              >
                {category}
              </Button>
          ))}
        </div>
        <div style={{height: '100px'}}></div>
        <div className="gallery-container">
              <>
                <div className="book-list">
                  {filteredBookData.slice(index, index + itemsPerPage).map(item => (
                      <div key={item.id} onClick={() => handlePhotoClick(item.id)} className='photo'>
                        <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
                      </div>
                  ))}
                </div>

                <div className="buttons">
                  <button onClick={handlePrevious} disabled={index === 0}><MdKeyboardDoubleArrowLeft/></button>
                  {currentPage}/{totalPages}
                  <button onClick={handleNext} disabled={index + 6 >= bookData.length}><MdKeyboardDoubleArrowRight/>
                  </button>
                </div>
              </>
        </div>
      </div>
  )
}

export default EBookContext
