// import React from 'react'
// import '../../styles/ebookcontext.css'

// const ReadBook = () => {
//     return (
//         <>
//             <a href='/' >Back</a>
//             <div className='view-novel-outer'>
//                 <div className="left-photo-outer">
//                     <img src="https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2FE-book.png?alt=media&token=6bccb2ff-8c79-4ea0-85d1-d0aecc3735db" alt=""  style={{width:'300px', height:'400px'}}/>
//                 </div>
//                 <div className="right-desc-outer">
//                     <br /><br />
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti? Delectus odio culpa explicabo dolorem saepe id, sapiente fuga et reprehenderit quibusdam corrupti harum dolore possimus incidunt quo quasi blanditiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatem nesciunt corporis vel accusamus nihil. Molestias in commodi atque quia ullam fugiat, ipsum consequuntur accusamus dicta? Obcaecati fuga ullam commodi?</p>
//                     <br/>
//                     <div className="pricing-card">
//                         <span> 3.45/- $ </span>
//                         <span>1070/- LKR</span>
//                     </div>

//                     <br/>
                    
//                     <div className="button-outer">
//                         <button>  <a href="https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2FLesson%2005.pdf?alt=media&token=a1e41878-72db-4c91-8243-be6d68b39156"> Read preview</a>
//                         </button>
//                         <button>
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ReadBook

import  {React , useState } from 'react'
import '../../styles/ebookcontext.css'
import {Document, Page, pdfjs} from "react-pdf"
import PDF from '../../assest/pdf/html_asd.pdf'


    
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
    
    const ReadBook = (pdf) =>{

    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)

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
            <div className="bar" >
                <h3>Pdf View without download/Print/Screenshot/copy </h3>
            </div> 
                <div className="wrap">
                    <div className="controls" >
                        <button onClick={prevPage} disabled={pageNumber===1}>
                            Prev
                        </button>
                        <button onClick={nextPage} disabled={pageNumber===numPages}>
                            Next
                        </button>
                    </div>
                    <Document file={"../../assest/pdf/html_asd.pdf"} onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-container" >
                        <Page pageNumber={pageNumber}/>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </Document>
                </div> 
        </>
        // <>
        //     <div className="bar"  onContextMenu={(e) => e.preventDefault()}>
        //         <h3>Pdf View without download/Print/Screenshot/copy </h3>
        //     </div> 
        //         <div className="wrap">
        //             <div className="controls"  onContextMenu={(e) => e.preventDefault()}>
        //                 <button onClick={prevPage} disabled={pageNumber===1}>
        //                     Prev
        //                 </button>
        //                 <button onClick={nextPage} disabled={pageNumber===numPages}>
        //                     Next
        //                 </button>
        //             </div>
        //             <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}
        //             onContextMenu={(e) => e.preventDefault()}
        //             className="pdf-container" >
        //                 <Page pageNumber={pageNumber}/>
        //                 <p>
        //                     Page {pageNumber} of {numPages}
        //                 </p>
        //             </Document>
        //         </div> 
        // </>
    )

}
   
export default ReadBook





