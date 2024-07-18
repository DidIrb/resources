import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/globals.css';
import AuthProvider from './context/auth.context.tsx';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
  </React.StrictMode>
);
