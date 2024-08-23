import React from 'react'
import A1 from "../../assest/about/A1.jpg"
import A2 from "../../assest/about/A2.jpg"
import "../../styles/about.css"
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import Form from "react-bootstrap/Form";

const About = () => {
  return (
      <>
          <NavBar/>
          <div className="about-outer">
              <h2> About Us</h2>
              <p>
                  Welcome to www.readlanka.com, your one-stop destination for all things e-books, audio books, and
                  online libraries. Immerse yourself in a world where literature meets technology, as we offer a diverse
                  collection of e-books ranging from newspapers to best-selling novels, and a wide selection of audio
                  books for listeners on the go.
                  At ReadLanka, we believe in the power of words to inspire, educate, and entertain. Explore our virtual
                  store where you can browse through different genres, discover hidden literary gems, and curate your
                  personalized online library with just a few clicks.
                  Create your own reading oasis where you can escape reality and embark on literary adventures from the
                  comfort of your device. With a seamless website experience and secure payment options, purchasing and
                  enjoying your favorite e-books and audio books has never been easier.
                  Let www.readlanka.com be your digital bookshelf, where stories come to life and imagination knows no
                  bounds. Start your literary journey today with us!
              </p>
          </div>
          <div className='main-outer'>
              <Form className='privacy-controler' style={{width:'100%'}}>
                  <div className='privacy-inner-outer'>
                      <h2><b>Terms & Conditions</b></h2>
                      <div style={{height: '30px'}}></div>
                      <p>Thank you for using our News, Book store and library website. By using our website, you agree
                          to these
                          terms and conditions.
                      </p>
                      <div style={{height: '20px'}}></div>
                      <ol>
                          <li>Copyright: All content on our website, including text, images, and audio, is the
                              property of our
                              website or its content providers and is protected by copyright laws. You may not
                              reproduce, distribute,
                              or display any content without our prior written consent.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Limitation of Liability: We are not liable for any damages arising from your use of our
                              website,
                              including but not limited to direct, indirect, incidental, or consequential damages. We
                              do not guarantee
                              the accuracy, completeness, or reliability of any content on our website.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Governing Law: These terms and conditions are governed by the laws of Sri Lanka. Any
                              disputes
                              arising from your use of our website will be resolved in accordance with the laws of Sri
                              Lanka.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>User Content: You are solely responsible for any content you post on our website,
                              including
                              comments, reviews, and ratings. You must not post any content that is offensive,
                              defamatory, or
                              infringes on the rights of others. We reserve the right to remove any content that
                              violates these terms.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Facebook Authentication: By using Facebook authentication to sign up for our website,
                              you
                              agree to Facebook's terms and policies, as well as our own. We may access and use your
                              Facebook
                              profile information in accordance with our privacy policy.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Modification: We reserve the right to modify these terms and conditions at any time
                              without
                              notice. Your continued use of our website after any changes indicates your acceptance of
                              the modified
                              terms.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Indemnification: You agree to indemnify and hold us harmless from any claims, damages,
                              or
                              losses arising from your use of our website or your violation of these terms.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Severability: If any provision of these terms and conditions is found to be invalid or
                              unenforceable, the remaining provisions will remain in full force and effect.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Payments and Refund Policy:
                              We may provide paid products and/or services within Service. In that case, we use
                              third-party
                              services for payment processing.
                              We sell digital products such as eBooks and audio books. Due to the nature of digital
                              products, we do
                              not offer refunds once a purchase is completed. It is your responsibility to ensure that
                              you have selected
                              the correct item before making a purchase.
                          </li>
                          <div style={{height: '20px'}}></div>
                          <li>Contact Us: If you have any questions or concerns about these terms and conditions,
                              please
                              contact us at admin@readlanka.com
                          </li>
                      </ol>

                      <div style={{height: '60px'}}></div>
                      <h2><b>Privacy Policy</b></h2>
                      <div style={{height: '30px'}}></div>

                      <p>Thank you for choosing our News, Book store and Library website. We understand the importance
                          of
                          protecting your personal information and respecting your privacy. In this privacy policy, we
                          will explain
                          how we collect, use, and protect your information when you use our website and Facebook
                          authentication
                      </p>
                      <div style={{height: '20px'}}></div>
                      <p>Information We Collect: When you use our website and sign up using Facebook authentication,
                          we may
                          collect the following information:
                      </p>

                      <div style={{height: '30px'}}></div>
                      <ul>
                          <li>Your name, email address, and other basic profile information provided by yourself and
                              Facebook.
                          </li>
                          <li>Information about the books you have read or are interested in.</li>
                      </ul>
                      <div style={{height: '20px'}}></div>
                      <p>Information Sharing: We do not sell or share your personal information with third parties for
                          marketing
                          purposes. However, we may share your information with service providers who help us operate
                          our
                          website and provide our services. We may also share your information if required by law or
                          to protect
                          our rights and interests.
                      </p>
                      <div style={{height: '30px'}}></div>
                      <p>Data Security: We take data security seriously and have implemented appropriate technical and
                          organizational measures to protect your personal information from unauthorized access, use,
                          or
                          disclosure.
                      </p>
                      <div style={{height: '30px'}}></div>
                      <p>
                          Cookies: We use cookies and other similar technologies to personalize your experience on our
                          website
                          and to analyze usage patterns. You can control cookies through your browser settings.
                      </p>
                      <div style={{height: '30px'}}></div>
                      <p>
                          Changes to This Privacy Policy: We may update this privacy policy from time to time. If we
                          make any
                          material changes, we will notify you by email or by posting a notice on our website.
                      </p>
                      <div style={{height: '30px'}}></div>
                      <p>Contact Us: If you have any questions or concerns about this privacy policy or how we use
                          your
                          information, please contact us at
                          <a href='mailto:admin@readlanka.com' style={{color: 'blue'}}> admin@readlanka.com</a>
                      </p>

                  </div>
              </Form>
          </div>
          <Footer/>
      </>
  )
}

export default About
