import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/globals.css';
import AuthProvider from './context/auth.context.tsx';
import { Toaster } from 'sonner';
import AppContext from './context/app.context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <AppContext>
        <App />
        <Toaster position="top-center" />
      </AppContext>
    </AuthProvider>
  </React.StrictMode>
);
