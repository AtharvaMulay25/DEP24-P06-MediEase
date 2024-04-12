import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import Toaster from './components/UI/Toaster.jsx';

import { AuthContextProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
      <Toaster richColors closeButton position="top-center" />
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
