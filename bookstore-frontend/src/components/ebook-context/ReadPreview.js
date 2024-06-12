import  {React , useState, useEffect, useRef} from 'react'
import {Document, Page, pdfjs} from "react-pdf"
// import PDF from '../../assest/pdf/nowel.pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import '../../styles/ebookcontext.css'
import { FETCH_ALL_READ_BOOK_PDF } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';
import ScreenLoading from '../loading/Loading'
import { SlArrowLeftCircle } from "react-icons/sl";
import EbookTopBar from '../ebook-context/EbbokTopBar'


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
    ).toString();

const ReadPreview = () =>{
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfData, setPdfData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [width, setWidth] = useState(0)
    const containerRef = useRef(null)

    const selectedBookId = localStorage.getItem('selectedBookId');

    useEffect(() => {
        const fetchData = async () => {
            try {
             const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK_PDF}/${selectedBookId}`);
                console.log('selected Book Pdf Data Execute start');
            const selectedBookData = response.data;
            console.log('Selected Book Pdf Data:', selectedBookData);
            setPdfData(selectedBookData.pdfData);
            setLoading(false)
          } catch (error) {
            console.log('Error:', error);
            window.location.href="/login";
          }
        };
        
        fetchData();
      }, []);

    const onDocumentLoadSuccess = ({numPages}) => {
            setNumPages(numPages)
    }
    const nextPage =() =>{
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }
    const prevPage =() =>{
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }
    const RedirectPage= ()=> {
        window.location.href= "/read-book"
    }
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.clientWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return <ScreenLoading />
    }
    return (
        <>
            <div className="bar" onContextMenu={(e) => e.preventDefault()}>
            <SlArrowLeftCircle onClick={RedirectPage} style={{fontSize:"50px", margin:'10px',color: "white"}}/>
                {/* <EbookTopBar/> */}
            </div> 
            <div className="wrap" onContextMenu={(e) => e.preventDefault()} ref={containerRef}>
                <div className="controls" onContextMenu={(e) => e.preventDefault()}>
                    <button onClick={prevPage} >
                        Prev
                    </button>
                    <button onClick={nextPage} >
                        Next
                    </button>
                </div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                {pdfData  && (
                    <Document 
                        file={`data:application/pdf;base64,${pdfData}`} 
                        onLoadSuccess={onDocumentLoadSuccess}
                        onContextMenu={(e) => e.preventDefault()}
                        className="pdf-container" >
                        <Page pageNumber={pageNumber} width={width} className="pdf-page"/>
                    </Document>
                )} 
            </div> 
        </>
    )
}
export default ReadPreview
