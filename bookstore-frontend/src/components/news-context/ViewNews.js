import React from 'react'
import '../../styles/newscontext.css'
import { FacebookShareButton } from 'react-share'
import { FacebookIcon } from 'react-share'
import { Container } from 'react-bootstrap'

const ViewNews = () => {
  return (
    <>
           <>
            <a href='/' >Back</a>
            <div className='view-news-outer'>
                <div className="left-news-outer">
                    <img src="https://firebasestorage.googleapis.com/v0/b/readlanka-c7718.appspot.com/o/local%2Fnews-letter.jpeg?alt=media&token=70e7e003-1507-438b-91f3-89308b3d658a" alt=""  style={{width:'300px', height:'400px'}}/>
                </div>
                <div className="right-desc-outer">
                    <br /><br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti? Delectus odio culpa explicabo dolorem saepe id, sapiente fuga et reprehenderit quibusdam corrupti harum dolore possimus incidunt quo quasi blanditiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatem nesciunt corporis vel accusamus nihil. Molestias in commodi atque quia ullam fugiat, ipsum consequuntur accusamus dicta? Obcaecati fuga ullam commodi? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae eum animi nisi, tenetur repudiandae non distinctio a praesentium asperiores maxime deleniti ipsam modi eos fuga minus nemo molestiae, ducimus quibusdam!</p>
                    <br/>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, deleniti? Delectus odio culpa explicabo dolorem saepe id, sapiente fuga et reprehenderit quibusdam corrupti harum dolore possimus incidunt quo quasi blanditiis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatem nesciunt corporis vel accusamus nihil. Molestias in commodi atque quia ullam fugiat, ipsum consequuntur accusamus dicta? Obcaecati fuga ullam commodi? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae eum animi nisi, tenetur repudiandae non distinctio a praesentium asperiores maxime deleniti ipsam modi eos fuga minus nemo molestiae, ducimus quibusdam!</p>
                    <br/>
                    
                    <div className="button-outer">
                        <button>  <a href=""> Read preview</a>
                        </button>
                    </div>
                    {/* <Container>
                        <Segment>
                            <FacebookShareButton>
                                <FacebookIcon logoFillColor="white" round ={true}>

                                </FacebookIcon>
                            </FacebookShareButton>
                        </Segment>
                    </Container> */}
                </div>
            </div>
        </>
    </>
  )
}

export default ViewNews
