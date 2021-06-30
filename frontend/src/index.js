import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

export const BASE_URL = 'http://localhost:4000/';
  

ReactDOM.render(<App />, document.getElementById('root'));
