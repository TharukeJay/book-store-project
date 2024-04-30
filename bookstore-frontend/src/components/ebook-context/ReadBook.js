import React from 'react'
import '../../styles/ebookcontext.css'

const ReadBook = () => {
    return (
        <>
            <a href='/' >Back</a>
            <div className='view-novel-outer'>
                <div className="left-photo-outer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2FE-book.png?alt=media&token=6bccb2ff-8c79-4ea0-85d1-d0aecc3735db" alt=""  style={{width:'300px', height:'400px'}}/>
                </div>
                <div className="right-desc-outer">
                    <br /><br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti? Delectus odio culpa explicabo dolorem saepe id, sapiente fuga et reprehenderit quibusdam corrupti harum dolore possimus incidunt quo quasi blanditiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatem nesciunt corporis vel accusamus nihil. Molestias in commodi atque quia ullam fugiat, ipsum consequuntur accusamus dicta? Obcaecati fuga ullam commodi?</p>
                    <br/>
                    <div className="pricing-card">
                        <span> 3.45/- $ </span>
                        <span>1070/- LKR</span>
                    </div>

                    <br/>
                    
                    <div className="button-outer">
                        <button>  <a href="https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2FLesson%2005.pdf?alt=media&token=a1e41878-72db-4c91-8243-be6d68b39156"> Read preview</a>
                        </button>
                        <button>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReadBook
