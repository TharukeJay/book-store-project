import React,{useState, useEffect, useRef} from 'react'
import PrivacyPdf from '../../assest/pdf/කොපිරයිට්ස්.pdf'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import API_ENDPOINT from '../../apis/httpAxios';
import { FETCH_PRIVACY } from '../../apis/endpoints';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
  ).toString();

const PrivacyPolicy = () => {
  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfData, setPdfData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [width, setWidth] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
         console.log('selected Book Pdf Data Execute start');
         const privacyResponse = await API_ENDPOINT.get(FETCH_PRIVACY);
         console.log('Selected Book Pdf Data:', privacyResponse);
         const selectedBookData = privacyResponse.data;
         setPdfData(selectedBookData.pdfData);
      } catch (error) {
        console.log('Error:', error);
        // window.location.href="/login";
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
  
  return (
    <>
      {/* <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={1} />
      </Document> */}
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

export default PrivacyPolicy
