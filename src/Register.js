import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [type, setType] = useState('user'); // Assuming default type is 'user'
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      type: type,
    };
  
    try {
      const response = await fetch('https://user-xojp.onrender.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        // Check if the response is not JSON (e.g., HTML error page)
        if (!response.headers.get('content-type').includes('application/json')) {
          throw new Error('Unexpected server response');
        }
  
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
        throw new Error(errorData.detail); // Throw the error message received from the backend
      }
    
      // Registration successful, redirect to login page
      window.location.href = 'https://react-frontend-68tc.onrender.com/login';
    } catch (error) {
      console.error('Error registering user:', error.message);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Surname:</label>
          <input
            type="text"
            id="surname"
            className="form-control"
            value={surname}
            onChange={handleSurnameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">User Type:</label>
          <select
            id="type"
            className="form-control"
            value={type}
            onChange={handleTypeChange}
            required
          >
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <div className="mt-3">
        <p>Already have an account? <a href="https://react-frontend-68tc.onrender.com/login">Login here</a>!</p>
      </div>
    </div>
  );
};

export default Register;
