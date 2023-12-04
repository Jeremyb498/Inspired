import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/hand_heart_image.svg';
import profileIcon from '../assets/Profile_Image.svg';
import starFavorite from '../assets/star.svg';
import '../App.css';

function ResultsPage() {
  const isLoggedIn = localStorage.getItem('userToken') !== null;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(storedFavorites);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setNewSearch(query);
    }
  }, [query]);

  function setNewSearch(newSearchValue) {
    fetch(`/api/searchTerm/${newSearchValue}`)
      .then(handleResult)
      .then(handleData)
      .catch(handleError)
      .finally(() => setIsLoading(false));
  }

  function handleResult(result) {
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    return result.json();
  }

  function handleData(data) {
    setSearchResults(data.nonprofits);
  }

  function handleError(error) {
    console.error('Error fetching data:', error);
    setError('An error occurred. Please try again.');
  }

  const handleFavorite = (searchResult) => {
    if (isLoggedIn) {
     
      const newFavorites = [...favorites, searchResult];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {

      navigate('/Login');
    }
  };

  const handleNonprofit = (searchResult) => (
    <div key={searchResult.name} className="nonprofit-box">
      <div className="nonprofit-item">
        <div className="nonprofit-details">
          <img
            src={searchResult.image || searchResult.logoUrl}
            alt={searchResult.name}
            className="nonprofit-image"
          />
          <div className="nonprofit-text">
            <h3>
              <a href={searchResult.profileUrl + '#donate'}>{searchResult.name}</a>
              {isLoggedIn && (
                <button
                  className="favorite-button"
                  onClick={() => handleFavorite(searchResult)}
                >
                  <img src={starFavorite} alt="Favorite" />
                </button>
              )}
            </h3>
            <p className="description">{searchResult.description}</p>
          </div>
        </div>
      </div>
    </div>
  );

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
      <div className="results-container">
        <h2>Nonprofits related to: "{query}"</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="nonprofit-list">{searchResults.map(handleNonprofit)}</div>
      </div>
    </div>
  );
}

export default ResultsPage;