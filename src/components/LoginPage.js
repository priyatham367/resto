import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Predefined array of username and password
  const users = [
      { username: 'SampleRafeeq', password: 'Rafeeq123' },
      { username: 'Viswanath', password: 'pass456' }
  ];

  const handleLogin = (event) => {
      event.preventDefault(); // Prevent the form from submitting traditionally
      // Check if the credentials match any user in the predefined array
      const match = users.some(user => user.username === email && user.password === password);
      if (match) {
          navigate('/home'); // Redirect to /home if the credentials are correct
      } else {
          alert('Invalid credentials!'); // Alert the user if credentials do not match
      }
  };

  return (
      <div className="login-container">
          <div className="login-box">
              <h3>Welcome To Rafeeq Den</h3>
              <p>Please fill out the form below to get started</p>
              <form onSubmit={handleLogin}>
                  <input
                      type="name"
                      placeholder="name"
                      className="login-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                      type="password"
                      placeholder="Password"
                      className="login-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="login-button">Login</button>
              </form>
          </div>
      </div>
  );
}

export default LoginPage;

  