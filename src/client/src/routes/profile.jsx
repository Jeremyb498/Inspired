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
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/Login');
  };

  // Retrieve favorites from local storage
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div className="App">
      <nav className="App-nav">
        <Link to="/Home" className="App-nav-logo">
          <img src={logoIcon} alt="Inspired logo" className="App-logo" />
          Inspired
        </Link>
        <Link to="/Search" className="App-nav-item">
          Search
        </Link>
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
          <button onClick={handleLogout} style={{ backgroundColor: 'orange' }}>
            Logout
          </button>
        </div>

        <div className="Profile-main">
          <div className="Profile-stars-header">
            <img src={starIcon} alt="Stars" className="Profile-star-icon" />
            <h2>Stars</h2>
          </div>
          {storedFavorites.length === 0 && <p>No favorites yet.</p>}
          {storedFavorites.map((favorite, index) => (
            <div key={favorite.name} className="starred-nonprofit">
              <a href={favorite.profileUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={favorite.image || favorite.logoUrl}
                  alt={favorite.name}
                  className="starred-nonprofit-image"
                />
              </a>
              <div className="starred-nonprofit-details">
                <h3>
                  <a href={favorite.profileUrl} target="_blank" rel="noopener noreferrer">
                    {favorite.name}
                  </a>
                </h3>
                {/* Additional details if needed */}
              </div>
              {index !== storedFavorites.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
