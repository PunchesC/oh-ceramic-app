import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Use createRoot to manage the root of your app
const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
