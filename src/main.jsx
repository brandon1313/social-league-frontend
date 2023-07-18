import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import store from './app/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store = { store } >
        <CssBaseline/>
        <App />
      </Provider>

  </React.StrictMode>,
)
