import React from "react";
import { Link } from "react-router-dom";
import ".././App.css";

export default function About() {

    // Any Javascript code can go here, I think.

    return (
        <div className="App">
        <header className="App-header">
            {/* <a href = {`/`}>Root</a> | <a href={'/Home'}>Home</a> */}

            <nav>
              <Link to="/">Root</Link> | <Link to="/Home">Home</Link>
            </nav>

            <h1>About Page</h1>
          
            <p>
                The Inspired Project is a minimalistic React and Node.js app for UF's CEN3031 Group project.
                The app (will) interface with the Every.org API to search for NonProfits.
                The goal is to protoype an application where individuals can search for
                and find NonProfits that mean something to them.
            </p>
            
        </header>
      </div>
    );
  }

  // TEST