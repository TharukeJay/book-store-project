import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import  {FETCH_ALL_BOOK, FETCH_ALL_CATEGORY}  from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

const EBookContext = () => {
  const Navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredBookData, setFilteredBookData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [index, setIndex] = useState(0); 
  const [searchInput, setSearchInput] = useState('');

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
    Navigate('/read-book');
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

  if (loading) {
    return <ScreenLoading />
  }
  return (
    <>
      <br /><br />
      <div className="ebook-context-outer">
        <Stack direction="horizontal" gap={3} className='search-outer'>
          <Form.Control className="me-auto" 
            placeholder="Search by title..."
            value={searchInput}
            onChange={handleSearchInputChange} 
            onKeyPress={handleKeyPress}
          />
          <Button variant="secondary"  onClick={handleSearchSubmit}>Submit</Button>
        </Stack>
      </div>
      <br />

      <div className="category-buttons">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            onClick={() => handleCategoryClick(category)}
            className="btn btn-primary"
            style={{margin:"5px"}}
          >
            {category}
          </Button>
        ))}
      </div>
      <br />

      <div className="book-list">
        {filteredBookData && filteredBookData.slice(index, index + 14).map((bookItem, i) => (
          <div key={i} onClick={() => handlePhotoClick(bookItem.id)} className='photo'>
            <img src={bookItem.thumbnail_url}alt={`Thumbnail of ${bookItem.title}`} />
            <h4>{bookItem.title}</h4>
          </div>
        ))}
      </div>
      <div className="buttons-Ebook">
        <button onClick={handlePrevious} disabled={index === 0}> <FcPrevious /> </button>
        <button onClick={handleNext} disabled={index + 14 >= bookData.length}>  <FcNext /> </button>

      </div>
    </>
  )
}

export default EBookContext
