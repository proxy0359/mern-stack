import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './shared/context/auth-context';
import { UserContextProvider } from './shared/context/user-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AuthContextProvider>
);
