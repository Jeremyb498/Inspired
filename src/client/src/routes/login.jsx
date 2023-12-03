import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/hand_heart_image.svg';  
import profileIcon from '../assets/Profile_Image.svg';     
import '.././App.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUserAction = async (isCreatingAccount) => {
    const url = isCreatingAccount ? `/api/addUser/${username}/${password}` : `/api/login/${username}/${password}`;
    
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);

        if (isCreatingAccount) {
          alert('Account created successfully.');
          navigate('/Profile');
        } else {
          navigate('/Profile');
        }
      } else {
        alert(isCreatingAccount ? 'Account creation failed. The user may already exist.' : 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert(isCreatingAccount ? 'Account creation failed. Please try again later.' : 'Login failed. Please try again later.');
    }
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <Link to="/" className="App-nav-logo">
          <img src={logoIcon} alt="Inspired logo" className="App-logo" />
          Inspired
        </Link>
        <Link to="/Search" className="App-nav-item">Search</Link>
        <Link to="/Profile" className="App-nav-item">
          <img src={profileIcon} alt="Profile" className="App-profile-icon" />
        </Link>
      </nav>
      <header className="App-header">
        <h1>Login / Create Account</h1>
        <div className="Login-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleUserAction(false)}>Login</button>
          <button onClick={() => handleUserAction(true)}>Create Account</button>
        </div>
      </header>
    </div>
  );
}
