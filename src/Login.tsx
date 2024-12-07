// src/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional: For styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for authentication logic
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
      navigate('/puzzle'); // Redirect to dashboard or desired page
    } else {
      alert('Invalid credentials');
    }
  };

  return (
  
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Roots and Riddles</h1>
        <img src="src\images\logo3 - Copy.jpg" alt="logo of roots and riddle" />
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
