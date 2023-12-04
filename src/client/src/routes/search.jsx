import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/hand_heart_image.svg';
import profileIcon from '../assets/Profile_Image.svg';
import '.././App.css';

function SearchPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userToken') !== null;
  const [searchValue, setSearchValue] = useState('');

  function handleSearchInputChange(event) {
    setSearchValue(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (searchValue === '') {

    } else {
      navigate(`/result?query=${encodeURIComponent(searchValue)}`);
    }
  }

  function handleSurpriseMe() {
    fetch('/api/supriseMe')
      .then(response => response.json())
      .then(data => {
        navigate(`/result?query=${encodeURIComponent(data.name)}`);
      })
      .catch(error => {
        console.error('Error fetching Surprise Me data:', error);
      });
  }

  return (
    <div className="App">
      <nav className="App-nav">
        <Link to="/" className="App-nav-logo">
          <img src={logoIcon} alt="Inspired logo" className="App-logo" />
          <span>Inspired</span>
        </Link>
        <Link to="/Search" className="App-nav-item">
          Search
        </Link>
        <Link to={isLoggedIn ? "/Profile" : "/Login"} className="App-nav-item">
          <img src={profileIcon} alt="Profile" className="App-profile-icon" />
        </Link>
      </nav>
      <div className="Search">
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="Search for Nonprofit"
            type="search"
            name="search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
        </form>
        <button
          className="surprise-me-button"
          onClick={handleSurpriseMe}
          style={{ marginTop: '2px' }}
        >
          Surprise Me
        </button>
      </div>
   
    </div>
  );
}

export default SearchPage;
