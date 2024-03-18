import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style.css";
import "./typography.css";
import "./all.css";
import './interceptors/axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
