import  {React , useState, useEffect } from 'react'
import '../../styles/ebookcontext.css'
import {Document, Page, pdfjs} from "react-pdf"
// import PDF from '../../assest/pdf/nowel.pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { FETCH_ALL_READ_BOOK_PDF } from '../../apis/endpoints';
import API_ENDPOINT from '../../apis/httpAxios';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
    ).toString();

const ReadPreview = () =>{
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfData, setPdfData] = useState(null);
    const selectedBookId = localStorage.getItem('selectedBookId');

    useEffect(() => {
        console.log('selected Book Pdf Data Execute start');
        const fetchData = async () => {
          try {
            const response = await API_ENDPOINT.get(`${FETCH_ALL_READ_BOOK_PDF}/${selectedBookId}`);
            const selectedBookData = response.data;
            console.log('Selected Book Pdf Data:', selectedBookData);
            setPdfData(selectedBookData.pdfData);
          } catch (error) {
            console.log('Error:', error);
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

    return (
        <>
            <div className="bar" onContextMenu={(e) => e.preventDefault()}>
                <a href='/read-book' style={{color:'white'}}>Back</a>
                brbrbr
                brbrbrbr
                <h3>Pdf View without download/Print/Screenshot/copy </h3>

            </div> 
            <div className="wrap" onContextMenu={(e) => e.preventDefault()}>
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
                        <Page pageNumber={pageNumber}/>
                    </Document>
                )} 
            </div> 
        </>
    )
}
export default ReadPreview
