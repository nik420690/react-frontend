import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <Link to="/about">About</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default HomePage;
