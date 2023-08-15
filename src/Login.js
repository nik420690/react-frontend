import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const loginResponse = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const data = await loginResponse.json();
  
      if (loginResponse.ok) {
        localStorage.setItem('jwtToken', data.access_token);  // Save the JWT token locally
        // Save the user type and user ID locally
        localStorage.setItem('userType', data.user_type);
        localStorage.setItem('userId', data.user_id);
  
        // Start of fetching from a protected route
        const token = localStorage.getItem('jwtToken');
        const protectedResponse = await fetch('http://localhost:8000/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log(protectedData);
        }
        // End of fetching from a protected route
  
        if (data.user_type === "admin") {
          window.location.href = '/admin-dashboard'; // Redirect to admin dashboard
        } else {
          window.location.href = '/dashboard'; // Redirect to user dashboard
        }
  
      } else if (loginResponse.status === 401) {
        setErrorMessage('Invalid username or password. Please check your credentials.');
      } else {
        setErrorMessage('An error occurred while logging in.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <p>Don't have an account? <a href="http://localhost:4000/register">Register here</a>!</p>
      </div>
    </div>
  );
};

export default Login;
