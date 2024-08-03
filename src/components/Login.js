import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Updated import for API service
import '../styles.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await api.post('/users/login', { username, password });

      // Check if login was successful
      if (response.status === 200) {
        // Store login status in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
 
        window.location.reload();
        setTimeout(() => {
            
            navigate('/home');
        }, 200);
        console.log('Navigated to /home');
      }
      else{
        console.log('Login failed');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>

        <button type="button" onClick={goToSignUp}>Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
