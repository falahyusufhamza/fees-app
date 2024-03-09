import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";
axios.defaults.withCredentials = true;
axios.interceptors.response.use((response) => {
  return response;
},
  error => {
    if (error?.response?.status === 401) {
      window.location.href = process.env.NODE_ENV === "development" ? "http://localhost:3000/login" : "";
      return;
    }
    Promise.reject(error?.response)
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
