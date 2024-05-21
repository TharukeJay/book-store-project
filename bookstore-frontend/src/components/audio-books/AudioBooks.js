import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import  {FETCH_ALL_BOOK, FETCH_ALL_CATEGORY}  from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'

const AudioBooks = () => {
    const Navigate = useNavigate();
    const [audiobookData, setAudioBookData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(['All']);
    const [index, setIndex] = useState(0); 
    const [searchInput, setSearchInput] = useState('');
  
    
    useEffect(() => {
        console.log('Audio Data Execute start');
        const fetchData = async () => {
          try {
            const response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
            const allAudioBookData = response.data.data.filter(audio => audio.categoryType === 'Audio');
            setAudioBookData(allAudioBookData);
            setFilteredAudioBookData(allAudioBookData);
            setLoading(false)
            console.log('Audio Book Data:', audiobookData);
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
    localStorage.setItem('selectedAudioId', id);
    Navigate('/play-audio');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
        setFilteredAudioBookData(audiobookData);
    } else {
      setFilteredAudioBookData(audiobookData.filter(audio => audio.category === category));
    }
  };
  const filterAudio = (category, searchTerm) => {
    let filteredAudioBooks = audiobookData.filter(audio => audio.categoryType === 'Audio');

    if (category !== 'All') {
      filteredAudioBooks = filteredAudioBooks.filter(audio => audio.category === category);
    }
    if (searchTerm) {
      filteredAudioBooks = filteredAudioBooks.filter(audio =>
        audio.title && audio.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredAudioBookData(filteredAudioBooks);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterAudio(selectedCategory, searchInput);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };
  const handleNext = () => {
    if (index + 4 < audiobookData.length) {
      setIndex(index + 4);
    }
  };

  const handlePrevious = () => {
    if (index - 4 >= 0) {
      setIndex(index - 4);
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
        >
          {category}
        </Button>
      ))}
    </div>
    <br />

    <div className="book-list">
      {filteredAudioBookData && filteredAudioBookData.slice(index, index + 4).map((audioBookItem, i) => (
          <div key={i} onClick={() => handlePhotoClick(audioBookItem.id)} className='photo'>
            <img src={audioBookItem.thumbnail}alt={`Thumbnail of ${audioBookItem.title}`} />
            <h4>{audioBookItem.title}</h4>
          </div>
        ))}
    </div>
    <div className="buttons">
      <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
      <button onClick={handleNext} disabled={index + 4 >= audiobookData.length}>Next</button>

    </div>
  </>
  )
}

export default AudioBooks
