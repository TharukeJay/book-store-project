import React, { useState, useEffect } from 'react'
import '../../styles/newscontext.css';
import { useNavigate  } from 'react-router-dom';
import {FETCH_ALL_AUDIO_BOOK, FETCH_ALL_CATEGORY, FETCH_ALL_NEWS} from "../../apis/endpoints";
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

const NewsContext = () => {
  const [newsData, setNewsData] = useState([]);
  const [index, setIndex] = useState(0); 
  const Navigate = useNavigate();
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    console.log('News Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_NEWS);
        const newsData = response.data.data;
        console.log('News Data:', newsData);
        setNewsData(newsData);
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
        const response = await API_ENDPOINT.get(FETCH_ALL_CATEGORY);
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredNewsData(newsData);
    } else {
      setFilteredNewsData(newsData.filter(audio => audio.category === category));
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
    Navigate('/read-news');
  };

  const handleNext = () => {
    if (index + 8 < newsData.length) {
      setIndex(index + 8);
    }
  };

  const handlePrevious = () => {
    if (index - 8 >= 0) {
      setIndex(index - 8);
    }
  };

  const truncateDescription = (description) => {
    if (!description) {
      return '';
    }
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0,10).join(' ') + '...';
    }
    return description;
  };

  // --------------------------------------------
//   const Navigate = useNavigate();
//   const [audiobookData, setAudioBookData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [filteredAudioBookData, setFilteredAudioBookData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState(['All']);
//   const [index, setIndex] = useState(0);
//   const [searchInput, setSearchInput] = useState('');
//   const [indexNext, setIndexNext] = useState(0);
//
//   useEffect(() => {
//     console.log('Audio Data Execute start');
//     const fetchData = async () => {
//       try {
//         const response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
//         console.log('Audio Data Execute Midle', response);
//         const allAudioBookData = response.data.data;
//         console.log('allAudioBookData===========>>', allAudioBookData);
//         setAudioBookData(allAudioBookData);
//         setFilteredAudioBookData(allAudioBookData);
//         setLoading(false)
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//     fetchData();
//   }, []);
//   console.log('Audio Book Data:', filteredAudioBookData);
//
//   useEffect(() => {
//     // console.log('Category Data Execute start');
//     const fetchCategoryData = async () => {
//       try {
//         const response = await API_ENDPOINT.get(FETCH_ALL_CATEGORY);
//         const allCategoryData = response.data;
//         console.log('Category Data:', allCategoryData);
//         const otherCategories = Array.from(new Set(allCategoryData.data.map(categoryList => categoryList.categoryName)));
//         setCategories(['All', ...otherCategories]);
//
//         setLoading(false)
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
//
//     fetchCategoryData();
//   }, []);
//
//   const handlePhotoClick = (seriesId) => {
//     localStorage.setItem('selectedSeriesAudioId', seriesId);
//     Navigate('/play-audio');
//   };
//
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     if (category === 'All') {
//       setFilteredAudioBookData(audiobookData);
//     } else {
//       setFilteredAudioBookData(audiobookData.filter(audio => audio.category === category));
//     }
//   };
//   const filterAudio = (category, searchTerm) => {
//     // let filteredAudioBooks = audiobookData.filter(audio => audio.bookType === 'Audio Book');
//     let filteredBooks = audiobookData;
//
//     if (category !== 'All') {
//       filteredBooks = filteredBooks.filter(audio => audio.category === category);
//     }
//     if (searchTerm) {
//       filteredBooks = filteredBooks.filter(audio =>
//           audio.seriesTitle && audio.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase()));
//     }
//     setFilteredAudioBookData(filteredBooks);
//   };
//
//   const handleSearchInputChange = (event) => {
//     setSearchInput(event.target.value);
//   };
//
//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     filterAudio(selectedCategory, searchInput);
//   };
//
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearchSubmit(event);
//     }
//   };
//
//   const handleSelect = (selectedIndex) => {
//     setIndexNext(selectedIndex);
//   };
//
//   const chunkArray = (array, chunkSize) => {
//     const results = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       results.push(array.slice(i, i + chunkSize));
//     }
//     return results;
//   };
//   const bookChunks = chunkArray(filteredAudioBookData, 5);
//
//   if (loading) {
//     return <ScreenLoading />
//   }
//
//   return (
//       <>
//         <div className='outer' >
//           <NavBar/>
//           <br /><br />
//           <div className="ebook-context-outer">
//             <Stack direction="horizontal" gap={3} className='search-outer'>
//               <Form.Control className="me-auto"
//                             placeholder="Search by title..."
//                             value={searchInput}
//                             onChange={handleSearchInputChange}
//                             onKeyPress={handleKeyPress}
//               />
//               <Button variant="secondary"  onClick={handleSearchSubmit}>Submit</Button>
//             </Stack>
//           </div>
//           <br />
//
//           <div className="category-buttons">
//             {categories.map(category => (
//                 <Button
//                     key={category}
//                     variant={selectedCategory === category ? 'primary' : 'secondary'}
//                     className="btn btn-primary"  style={{margin:"5px"}}
//                     onClick={() => handleCategoryClick(category)}
//                 >
//                   {category}
//                 </Button>
//             ))}
//           </div>
//           <br />
//
//           <div className="book-list">
//
//             <Carousel activeIndex={indexNext} onSelect={handleSelect}>
//               {bookChunks.map((chunk, idx) => (
//                   <Carousel.Item key={idx}>
//                     <div className="book-list">
//                       {chunk.map((audioBookItem, i) => (
//                           <div key={i} onClick={() => handlePhotoClick(audioBookItem.seriesId)} className='photo'>
//                             <img src={audioBookItem.thumbnail_url} alt={`Thumbnail of ${audioBookItem.seriesTitle}`} />
//                           </div>
//                       ))}
//                     </div>
//                   </Carousel.Item>
//               ))}
//             </Carousel>
//
//           </div>
//         </div>
//         <Footer/>
//
//       </>
//   )
// }

return (
    <>
      <NavBar/>
      <br/><br/>
      <div className="ebook-search-outer">
        <Stack direction="horizontal" gap={3} className='search-outer'>
          <Form.Control className="me-auto"
                        placeholder="Search by title..."
                        value={searchInput}
                        onChange={handleSearchInputChangeNews}
                        onKeyPress={handleKeyPressNews}
          />
          <Button variant="secondary" onClick={handleSearchSubmitNews}>Submit</Button>
        </Stack>
      </div>
      <br/>
      <div className="category-buttons">
        {categories.map((category,index) => (
            <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                className="btn btn-primary" style={{margin: "5px"}}
                onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
        ))}
      </div>
      <br/>
      <div className='outer'>
        <div className='title-outer-news'>
          {/*<h2 style={{color: "blue"}}>News & Features</h2>*/}
          {/*<button>See All</button>*/}
        </div>
        <div className="gallery-container">

          <div className="news-list">
            {newsData.slice(index, index + 8).map((newsItem, i) => (
                <div key={i} onClick={() => handleNewsClick(newsItem.id)} className='news-outer'>
                  <img src={newsItem.thumbnail_url} alt="News" className="photo-item"/>
                  <p>{newsItem.newsTitle}</p>
                  <p>{truncateDescription(newsItem.description)}</p>
                </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={handlePrevious} disabled={index === 0}><FcPrevious/></button>
            <button onClick={handleNext} disabled={index + 4 >= newsData.length}><FcNext/></button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
)
}

export default NewsContext
