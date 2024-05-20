import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './User/AuthContext'; // AuthProvider import

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
