import React from "react";
import { Link } from "react-router-dom";
import ".././App.css";
import logoIcon from '../assets/hand_heart_image.svg';
import profileIcon from '../assets/Profile_Image.svg';


export default function Home() {
  const isLoggedIn = localStorage.getItem('userToken') !== null;

return (

    <div className="App">
    <nav className="App-nav">
        <Link to="/" className="App-nav-logo">
            <img src={logoIcon} alt="Inspired logo" className="App-logo" />
            <span>Inspired</span>
        </Link>
        <Link to="/Search" className="App-nav-item">Search</Link>
        <Link to={isLoggedIn ? "/Profile" : "/Login"} className="App-nav-item">
            <img src={profileIcon} alt="Profile" className="App-profile-icon" />
        </Link>
    </nav>


      <header className="App-header">
        <h1>Home</h1>
        <p>Welcome to Inspired!</p>
      </header>
      <section className="App-content-box">
        <h2>How to Use:</h2>
        <p> Simply use the navigation bar at the top to switch pages.<br />
            Search for nonprofits under the search tab in the middle. <br />
            Return home by clicking the "Inspired" logo on the left.<br />
            View your profile clicking the icon on the right. <br />
            If you log in, you can star nonprofits and save them to your profile.
            </p>
      </section>
      <section className="App-content-box">
        <h2>About Us:</h2>
        <p>
        Our application, Inspired, bridges the gap between social problems and solutions by 
        connecting individuals and nonprofit organizations. From donating to volunteering and 
        everything in between, supporting nonprofit organizations plays a crucial role in an 
        individuals impact on addressing unlimited amounts of social, environmental, and 
        humanitarian challenges. We know an increasing number of consumers seek out products 
        that have a positive impact on the world in some capacity, and Inspired helps users help 
        the world in ways that are meaningful to them.<br />
            <br />
          This app was made by Amelia Reeves, Jeremy Bright, and Justin Sanabria.
        </p>
      </section>
    
    </div>
  );

}
