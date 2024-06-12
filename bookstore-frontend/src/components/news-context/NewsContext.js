import React, { useState, useEffect } from 'react'
import '../../styles/newscontext.css';
import { useNavigate  } from 'react-router-dom';
import { FETCH_ALL_NEWS } from "../../apis/endpoints";
import API_ENDPOINT from '../../apis/httpAxios';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

const NewsContext = () => {
  const [newsData, setNewsData] = useState([]);
  const [index, setIndex] = useState(0); 
  const Navigate = useNavigate()

  useEffect(() => {
    console.log('News Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_NEWS);
        const userData = response.data;
        console.log('News Data:', userData);
        setNewsData(userData.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, [])

// useEffect(() => {
//     console.log('News Data Execute start');
//     const fetchData = async () => {
//       try {
//           fetch('http://localhost:3001/api/books/get-news')
//             .then((res) => {
//               return res.json();
//             })
//             .then((data) => {
//               setNewsData(data);
//               console.log('News Data:', data);
//             });
       
        
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
        
//     fetchData();
//   }, [])

  const handleNewsClick = (id) => {
    localStorage.setItem('selectedNewsId', id);
    Navigate('/read-news');
  };

  const handleNext = () => {
    if (index + 4 < newsData.length) {
      setIndex(index + 4);
    }
  };

  const handlePrevious = () => {
    if (index - 4 >= 0) {
      setIndex(index - 4);
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

  return (
    <>
    <br /><br />
    <div className='outer'>
    <div className='title-outer-news'>
      <h2  style={{ color:"blue"}}>News & Features</h2>
        <button>See All</button>
      </div>
    <div className="gallery-container">
 
      <div className="news-list">
      {newsData.slice(index, index + 4).map((newsItem, i) => (
            <div key={i} onClick={() => handleNewsClick(newsItem.id)} className='news-outer'>
              <img src={newsItem.thumbnail} alt="News" className="photo-item" />
              <p>{truncateDescription(newsItem.description)}</p>
            </div>
          ))}
      </div>
      <div className="buttons">
        <button onClick={handlePrevious} disabled={index === 0}> <FcPrevious /> </button>
        <button onClick={handleNext} disabled={index + 4 >= newsData.length}> <FcNext /> </button>

      </div>
    </div>
    </div>
    </>
  )
}

export default NewsContext
