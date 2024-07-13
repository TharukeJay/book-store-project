import React, { useState, useEffect } from 'react'
import '../../styles/newscontext.css';
import { useNavigate  } from 'react-router-dom';
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_CATEGORY, FETCH_ALL_NEWS, FETCH_NEWS_CATEGORY} from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import ScreenLoading from "../loading/Loading";
import NavBar from "../navbar/NavBar";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../footer/Footer";
import {bgColor} from "../../common/commonColors";
import {IoSearchOutline} from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const NewsContext = () => {
  const [newsData, setNewsData] = useState([]);
  const [index, setIndex] = useState(0); 
  const Navigate = useNavigate();
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    console.log('News Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_NEWS);
        const newsData = response.data.data;
        console.log('News Data:', newsData);
        setNewsData(newsData);
        setFilteredNewsData(newsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [])

  useEffect(() => {
    console.log('Category Data Execute start');
    const fetchCategoryData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_NEWS_CATEGORY);
        const allCategoryData = response.data.data;
        const otherCategories = Array.from(new Set(allCategoryData.map(categoryList => categoryList.categoryName)));
        setCategories(['All', ...otherCategories]);
        console.log('Category Data:', categories);

        setLoading(false)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    filterNews(selectedCategory, searchInput);
  }, [searchInput, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredNewsData(newsData);
    } else {
      setFilteredNewsData(newsData.filter(news => news.category === category));
    }
  };

  const filterNews = (category, searchTerm) => {
    let filteredNews = newsData;

    if (category !== 'All') {
      filteredNews = filteredNews.filter(news => news.category === category);
    }
    if (searchTerm) {
      filteredNews = filteredNews.filter(news =>
          news.newsTitle && news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log("filteredBooks=================", filteredNews);
    }
    setFilteredNewsData(filteredNews);
  };

  const handleSearchInputChangeNews = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmitNews = (event) => {
    event.preventDefault();
    filterNews(selectedCategory, searchInput);
  };

  const handleKeyPressNews = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmitNews(event);
    }
  };

  const handleNewsClick = (id) => {
    localStorage.setItem('selectedNewsId', id);
    Navigate(/read-news/${id});
  };

  const handleNext = () => {
    if (index + itemsPerPage < newsData.length) {
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

  const { currentPage, totalPages } =getPageNumbers(index, newsData.length)

  const truncateDescription = (description) => {
    if (!description) {
      return '';
    }
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0,50).join(' ') + '...';
    }
    return description;
  };

  return (
      <div style={{background: bgColor}}>
        <NavBar/>
        <div className='outer' style={{background: bgColor, height: 'auto'}}>
        <br/><br/>
        <div className="ebook-search-outer">
          <Stack direction="horizontal" gap={3} className='search-outer'>
            <Form.Control className="me-auto"
                          placeholder="Search by title..."
                          value={searchInput}
                          onChange={handleSearchInputChangeNews}
                          onKeyPress={handleKeyPressNews}
                          style={{border:'1px solid blue'}}
            />
            <Button variant="secondary" onClick={handleSearchSubmitNews}><IoSearchOutline style={{color:'white'}}/></Button>
          </Stack>
        </div>
        <br/>
        <div className="category-buttons-news">
          {categories.map((category,index) => (
              <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'secondary'}
                  className="btn btn-primary button"
                  style={{margin: "5px", borderRadius:'15px'}}
                  onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
          ))}
        </div>
        <br/>
          <div className='title-outer-news'></div>
          <div className="gallery-container">
            <div className= 'news-strip'>
              <p> රත්නපුර අහස කළු කර ගෙන ආවේ ය. මම සැහැල්ලු කපු කලිසමක් හා කෙටි ටී කමිසයක් හැඳ ගෙන කාමරයෙන් එළියට ආවෙමි. සීතල සුළඟක් දෙවන මහළේ සේද තිර රෙදි අහසේ පා කරමින් ගෙතුළට වැද දගයක් කළේය. මට සිනහවක් නැගිණ. " වැස්සක් අත ළඟ කෙල්ලේ " දෙවන මහලේ ආලින්දයේ සෝෆා කට්ටලයෙහි හිඳ කකුල් දෙකද පුටුව උඩට ගෙන උන් තාත්තම්මා කාලගුණ නිවේදනය නිකුත් කළාය. " වහින එක පායන එක අපිට නතර කරන්න පුළුවන් ද තාත්තම්මා...'' මා ඈ අස හිඳ ගනිමින්</p>
            </div>
            <div className= 'picture-rim'>
              <h1>  Picture Rim </h1>
            </div>
            <div className="news-list">
              {filteredNewsData.slice(index, index + itemsPerPage).map((newsItem, i) => (
                  <div  className='news-outer'>
                    <div key={i} onClick={() => handleNewsClick(newsItem.id)} className='left-news-outer'>
                      <img src={newsItem.thumbnail_url} alt="News" className="photo-item"/>
                    </div>
                    <div className='right-news-outer'>
                      <h2 key={i} onClick={() => handleNewsClick(newsItem.id)}>{newsItem.newsTitle}</h2>
                      <br/>
                      <p>{truncateDescription(newsItem.description)} </p>
                      <button className='btn btn-default' style={{fontSize: '15px', border:'1px solid black'}} key={i} onClick={() => handleNewsClick(newsItem.id)}>READ MORE</button>
                    </div>
                  </div>
              ))}
            </div>
            <div className="buttons">
              {/<button onClick={handlePrevious} disabled={index === 0}><FcPrevious/></button>/}
              <button onClick={handlePrevious} disabled={index === 0}><MdKeyboardDoubleArrowLeft /></button>
              {currentPage}/{totalPages}
              <button onClick={handleNext} disabled={index + 8 >= newsData.length}><MdKeyboardDoubleArrowRight /></button>
              {/<button onClick={handleNext} disabled={index + 4 >= newsData.length}><FcNext/></button>/}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
}

export default NewsContext