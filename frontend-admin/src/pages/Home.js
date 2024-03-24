// Home.js
import React from 'react';
import TopNavbar from "./nav_bars/Top_nav_bar";
import SideNavbar from "./nav_bars/Side_nav_bar";

function Home() {
    return (
        <div>
            <TopNavbar />
            <div style={{ display: 'flex' }}>
                <SideNavbar />
                <div>
                    <h2>Home Page</h2>
                    <p>Welcome to the Home Page!</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
