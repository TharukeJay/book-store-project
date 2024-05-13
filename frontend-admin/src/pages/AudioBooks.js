import React, { useState } from 'react';
import TopNavbar from "./nav_bars/Top_nav_bar";
import SideNavbar from "./nav_bars/Side_nav_bar";
import { Form, FormGroup, Button } from 'react-bootstrap';


function Home() {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');


    return (
        <div>
            <div style={{ display: 'flex' }}>

                <div style={{ marginLeft: '20px' }}>
                    <h2>Audio Books</h2>
                    <p>Welcome to the Page!</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
