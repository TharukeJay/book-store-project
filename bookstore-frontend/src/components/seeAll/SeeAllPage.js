import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_ENDPOINT from '../../apis/httpAxios';
import { FETCH_ALL_BOOK, FETCH_ALL_AUDIO_BOOK } from '../../apis/endpoints.js';
import ScreenLoading from '../loading/Loading';

const SeeAllPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === 'book') {
          response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
          setData(response.data.data.filter(book => book.bookType === 'PDF'));
        } else if (type === 'audiobook') {
          response = await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
          setData(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [type]);

  if (loading) {
    return <ScreenLoading />;
  }

  const handlePhotoClick = (id) => {
    if (type === 'book') {
      localStorage.setItem('selectedBookId', id);
      navigate('/read-book');
    } else if (type === 'audiobook') {
      localStorage.setItem('selectedSeriesAudioId', id);
      navigate('/play-audio');
    }
  };

  return (
      <div>
        <h2>{type === 'book' ? 'All Books' : 'All Audiobooks'}</h2>
        <div className="book-list">
          {data.map(item => (
              <div key={item.id} onClick={() => handlePhotoClick(item.id)} className='photo'>
                <img src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`} />
              </div>
          ))}
        </div>
      </div>
  );
};

export default SeeAllPage;
