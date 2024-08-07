import React, {useEffect} from 'react'
import {useState} from 'react'
import API_ENDPOINT from "../../apis/httpAxios";
import {
    FETCH_ALL_AUDIO_BOOK,
    FETCH_ALL_BOOK,
    GET_USER_DATA,
    FETCH_ALL_AUDIO_BOOK_ID,
    FETCH_ALL_CATEGORY
} from "../../apis/endpoints";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import ScreenLoading from "../loading/Loading";
import '../../styles/ebookcontext.css';
import {bgColor} from "../../common/commonColors";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FcNext, FcPrevious} from "react-icons/fc";
import {useLocation, useNavigate} from "react-router-dom";
import {IoSearchOutline} from "react-icons/io5";

const MyLibraryEBook = () => {
    const [userData, setUserData] =useState("");
    const [audioBookId, setAudioBookId] =useState([]);
    const [audioBookData, setAudioBookData] =useState([]);
    const [pdfBookData, setPdfBookData] =useState([]);
    const [bookData, setBookData] =useState([]);
    const [filteredAudioBookData, setFilteredAudioBookData] =useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const Navigate = useNavigate()
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    const [index, setIndex] = useState(0);
    const [audioIndex, setAudioIndex] = useState(0);
    const itemsPerPage = 12;
    const [categories, setCategories] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const fetchUserData = async () => {
        try {
            const response = await API_ENDPOINT.get(`${GET_USER_DATA}/${userId}`);
            const getData = response.data.data;
            setUserData(getData);
            setAudioBookId(getData.purchaseBookListAudio || []);
            fetchDataBook(getData.purchaseBookListAudio);
            setLoading(false)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchDataBook = async (ABookData) => {
        try {
            const response=await API_ENDPOINT.get(FETCH_ALL_AUDIO_BOOK);
            const allAudioBookData = response.data.data;
            const audioBookIds = ABookData.map(book => book.bookId);
            const PurchaseBook = allAudioBookData.filter(book => audioBookIds.includes(book.id));
            setBookData(PurchaseBook);
            setFilteredAudioBookData(PurchaseBook);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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

    useEffect(() => {
        fetchUserData();
        fetchDataBook();
        fetchCategoryData();
    }, []);

    useEffect(() => {
        filterBooks(selectedCategory, searchInput);
    }, [searchInput, selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredAudioBookData(bookData);
        } else {
            setFilteredAudioBookData(bookData.filter(book => book.category === category));
        }
    };

    const filterBooks = (category, searchTerm) => {
        let filteredBooks = bookData;

        if (category !== 'All') {
            filteredBooks = filteredBooks.filter(book => book.category === category);
        }
        if (searchTerm) {
            filteredBooks = filteredBooks.filter(book => book.seriesTitle && book.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log("filteredBooks=================", filteredBooks);
        }
        setFilteredAudioBookData(filteredBooks);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(event);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        filterBooks(selectedCategory, searchInput);
    };

    const handlePhotoClick = (id) => {
        // localStorage.setItem('selectedSeriesAudioId', id);
        Navigate(`/my-audio-play/${id}`, {state:{selectedSeriesAudioId: id}});
    };

    const handleAudioNext = () => {
        if (audioIndex + itemsPerPage  < filteredAudioBookData.length) {
            setAudioIndex(audioIndex + itemsPerPage );
        }
    };

    const handleAudioPrevious = () => {
        if (audioIndex - itemsPerPage  >= 0) {
            setAudioIndex(audioIndex - itemsPerPage );
        }
    };

    const getPageNumbers = (currentIndex, dataLength) => {
        const totalPages = Math.ceil(dataLength / itemsPerPage);
        const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;
        return { currentPage, totalPages };
    };

    const { currentPage, totalPages } = getPageNumbers(audioIndex, filteredAudioBookData.length);

    if (loading) {
        return <ScreenLoading />
    }

    return (
        <>
            <Navbar/>
            <div style={{height: '40px'}}></div>
            <div className='outer' style={{background: bgColor}}>
                <div className="ebook-search-outer">
                    <Stack direction="horizontal" gap={3} className='search-outer'>
                        <Form.Control className="me-auto"
                                      placeholder="Search by title..."
                                      value={searchInput}
                                      style={{border:'1px solid blue'}}
                                      onChange={handleSearchInputChange}
                                      onKeyPress={handleKeyPress}
                        />
                        <Button variant="secondary" onClick={handleSearchSubmit}
                                className="btn btn-primary search-button"><IoSearchOutline style={{color:'white'}}/></Button>
                    </Stack>
                </div>
                <div style={{height: '30px'}}></div>
                <div className="category-buttons">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'primary' : 'secondary'}
                            onClick={() => handleCategoryClick(category)}
                            className="btn btn-primary button"
                            style={{margin: "5px"}}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="gallery-container">
                    <div className="book-list">
                        {filteredAudioBookData.slice(index, index + itemsPerPage).map(item => (
                            <div key={item.id} onClick={() => handlePhotoClick(item.seriesId)} className='photo'>
                                <img id="image" src={item.thumbnail_url} alt={`Thumbnail of ${item.title}`}/>
                            </div>
                        ))}
                    </div>
                    <div className="buttons">
                        <button onClick={handleAudioPrevious} disabled={audioIndex === 0}><FcPrevious/></button>
                        <span>{currentPage} / {totalPages}</span>
                        <button onClick={handleAudioNext}
                                disabled={audioIndex + itemsPerPage >= filteredAudioBookData.length}>
                            <FcNext/></button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyLibraryEBook
