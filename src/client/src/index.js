import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

// Import Pages From "./routes" folder
import Root from "./routes/root";
import About from "./routes/about";
import Home from "./routes/home";
import Profile from './routes/profile';
import Login from './routes/login'
import Search from './routes/search'
import Result from './routes/result'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        
    },
    {
        path: "/About",
        element: <About />,
        
    },
    {
        path: "/Home",
        element: <Home />,
        
    },
    {
        path: "/Profile",
        element: <Profile />,

      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Search",
        element: <Search />,
      },
      {
        path: "/Result",
        element: <Result />,
      },
]);

ReactDOM.render(<RouterProvider router={router} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
