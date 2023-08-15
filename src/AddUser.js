import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios'; // Import axios

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [type, setType] = useState('user');
  const [users, setUsers] = useState([]); // Define users state

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username already exists in the frontend state
    const usernameExists = users.some((user) => user.username === username);
    if (usernameExists) {
      console.error('Username already exists');
      // Handle the error, e.g., show an error message to the user
      return;
    }

    // Create a user object with the form data
    const user = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      type: type,
    };

    // Make a POST request to create a new user
    axios
      .post('http://localhost:8000/users/', user)
      .then((response) => {
        // If the user was created successfully, update the users state in the frontend
        setUsers([...users, response.data]);
        // Clear the form fields after successful submission
        setUsername('');
        setPassword('');
        setName('');
        setSurname('');
        setType('user');
        window.location.assign('http://localhost:4000/users');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };


  return (
    <>
    <AdminDashboard /> {/* Render the AdminDashboard component */}

    <div className="container mt-5">
      <h2 className="mb-3">Add User</h2>
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
          <label htmlFor="type" className="form-label">Type:</label>
          <select
            id="type"
            className="form-select"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
    </>
  );
};

export default AddUser;
