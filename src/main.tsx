import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/globals.css';
import AuthProvider from './context/auth.context.tsx';
import AppContext from './context/app.context.tsx';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AppContext>
          <App />
        </AppContext>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
