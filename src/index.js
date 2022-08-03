import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { RestfulProvider } from 'restful-react';

ReactDOM.render(
  <React.StrictMode>
    <RestfulProvider
      base={process.env.REACT_APP_BASE_URL || 'http://localhost:3000/'}
    >
      <Router>
        <Routes>
          <Route path='*' element={<App />} />
          <Route exact path='/' element={<Navigate to='/frontend/junior' />} />
        </Routes>
      </Router>
    </RestfulProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
