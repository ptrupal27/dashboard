import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/css/Login.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      localStorage.setItem('authenticated', true);
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <a href="/forgot-password" className="login-link">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default Login;
