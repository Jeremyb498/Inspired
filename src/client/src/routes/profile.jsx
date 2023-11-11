import React from "react";
import { Link } from "react-router-dom";
import logoIcon from '../assets/hand_heart_image.svg';  
import profileIcon from '../assets/Profile_Image.svg';  
import starIcon from '../assets/star.svg';  // Add your star icon to assets and adjust the path as necessary
import profileCircle from '../assets/profile_circle.svg';
import ".././App.css";

export default function Profile() {
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
          <input type="text" value="Username" readOnly className="Profile-username" />
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
