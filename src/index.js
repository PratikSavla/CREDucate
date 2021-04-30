import React from 'react';
import ReactDOM from 'react-dom';
import { AppContextProvider } from './utils/context';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);