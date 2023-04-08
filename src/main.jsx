import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { StateContextProvider } from './contexts/StateContextProvider';


import './index.css';

createRoot(document.getElementById('root')).render(
  <StateContextProvider>
    <Router>
      <App />
    </Router>
  </StateContextProvider>
);
