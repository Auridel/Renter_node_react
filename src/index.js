import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";
import Login from "./components/login/login";


ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <Login/>
  </React.StrictMode>,
  document.getElementById('root')
);