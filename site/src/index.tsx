import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css'
import './index.css'
import 'prismjs/themes/prism-coy.css'

const rootElement = document.getElementById("root");

if (rootElement && rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>, rootElement);
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
