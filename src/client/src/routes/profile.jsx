import React from "react";
import { Link } from "react-router-dom";
import logoIcon from '../assets/hand_heart_image.svg';  
import profileIcon from '../assets/Profile_Image.svg';  
import starIcon from '../assets/star.svg';  
import profileCircle from '../assets/profile_circle.svg';
import ".././App.css";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function Profile() {

  const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    let username = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        username = decodedToken.name;
    } else {
        navigate('/Login'); 
    }

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/Login');
    };


  return (
    <div className="App">
      <nav className="App-nav">
        <Link to="/Home" className="App-nav-logo">
          <img src={logoIcon} alt="Inspired logo" className="App-logo" />
          Inspired
        </Link>
        <Link to="/Search" className="App-nav-item">Search</Link>
        <Link to="/Profile" className="App-nav-item">
          <img src={profileIcon} alt="Profile" className="App-profile-icon" />
        </Link>
      </nav>

      <header className="App-header">
        <h1>Profile</h1>
      </header>
      
      <div className="Profile-container">
        <div className="Profile-side">
          <div className="Profile-icon-container">
            <img src={profileCircle} alt="Profile" className="Profile-icon" />
          </div>
          <div style={{ marginBottom: '20px' }}>Username: {username}</div> 
          <button onClick={handleLogout} style={{ backgroundColor: 'orange' }}>Logout</button>
        </div>

        <div className="Profile-main">
          <div className="Profile-stars-header">
            <img src={starIcon} alt="Stars" className="Profile-star-icon" />
            <h2>Stars</h2>
          </div>
          <hr className="Profile-divider" />
          {/* Placeholder for starred nonprofits */}
        </div>
      </div>
    </div>
  );
}
