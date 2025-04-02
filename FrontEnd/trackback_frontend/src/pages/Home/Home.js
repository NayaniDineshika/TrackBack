import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import './Home.css';

const Home =() => {
    return (
        <div>
            <div className = "home-container">
                <h1>Welcome to TrackBack</h1>
                <p> TrackBack helps you recover and manage what matters most. Whether it is misplaced items or important records we have got you covered!</p>

                <div className ="navigate-container">
                    <Link to="/Login" className="button-link">Let's Find Your Losts!</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;