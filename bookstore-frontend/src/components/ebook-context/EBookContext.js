import  { useState, useEffect, React }from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import '../../styles/ebookcontext.css';
import { useNavigate  } from 'react-router-dom';
import  {FETCH_ALL_BOOK}  from '../../apis/endpoints.js';
import API_ENDPOINT from '../../apis/httpAxios';

const EBookContext = () => {
  const Navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    console.log('Book Data Execute start');
    const fetchData = async () => {
      try {
        const response = await API_ENDPOINT.get(FETCH_ALL_BOOK);
        const allBookData = response.data;
        console.log('Book Data:', allBookData);
        setBookData(allBookData.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, []);

  const handlePhotoClick = (id) => {
    localStorage.setItem('selectedBookId', id);
    Navigate('/read-book');
  };
  return (
    <>
      <br /><br />
      <div className="ebook-context-outer">
        <Stack direction="horizontal" gap={3} className='search-outer'>
          <Form.Control className="me-auto" placeholder=" ..." />
          <Button variant="secondary">Submit</Button>
        </Stack>
      </div>
      <br />

      <div className='book-list'>
        {bookData.map((book) => (
          <div className='photo' key={book.id} onClick={() => handlePhotoClick(book.id)} > 
              <img src={book.thumbnail} alt={`Thumbnail of ${book.title}`} />
          </div>
        ))}
      </div>
    </>
  )
}

export default EBookContext
