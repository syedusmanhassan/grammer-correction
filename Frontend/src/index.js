import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./pages/login.css";
import App from './App';
// import Login from './pages/login';
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Login/> */}
  </React.StrictMode>
);

