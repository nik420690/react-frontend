import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About Page.</p>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default AboutPage;
