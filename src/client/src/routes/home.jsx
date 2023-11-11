import React from "react";
import { Link } from "react-router-dom";
import ".././App.css";

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Inspired</h1>
        <nav>
            <Link to="/">Root</Link> | <Link to="/About">About</Link>
        </nav>
        <p>This is the main landing page of the Inspired app.</p>
        {/* Add more content and styling as needed */}
      </header>
    </div>
  );
}
