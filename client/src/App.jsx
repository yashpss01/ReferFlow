
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ReferralList from './components/ReferralList';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="container">
        <h1>Candidate Referral System</h1>
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!token ? <Register setToken={setToken} /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={token ? <ReferralList token={token} logout={logout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
