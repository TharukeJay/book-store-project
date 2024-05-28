import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import  {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_CATEGORY}  from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'
import NavBar from '../navbar/NavBar.js';

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
    
  useEffect(() => {
    // console.log('Category Data Execute start');
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
    localStorage.setItem('selectedSeriesAudioId', id);
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
    // let filteredAudioBooks = audiobookData.filter(audio => audio.bookType === 'Audio Book');
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
    <NavBar/>
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
          className="btn btn-primary"  style={{margin:"5px"}}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
    </div>
    <br />

    <div className="book-list">
      {filteredAudioBookData && filteredAudioBookData.slice(index, index + 4).map((audioBookItem, i) => (
          <div key={i} onClick={() => handlePhotoClick(audioBookItem.seriesId)} className='photo'>
            <img src={audioBookItem.thumbnail_url}alt={`Thumbnail of ${audioBookItem.seriesTitle}`} />
            <h4>{audioBookItem.seriesTitle}</h4>
          </div>
        ))}
    </div>
    {/* <div className="buttons">
      <button onClick={handlePrevious} disabled={index === 0}>Previous</button>
      <button onClick={handleNext} disabled={index + 4 >= audiobookData.length}>Next</button>
    </div> */}
  </>
  )
}
export default AudioBooks
