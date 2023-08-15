import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/users" className="nav-link">Show Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-user" className="nav-link">Add User</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Show Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-product" className="nav-link">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-comments" className="nav-link">Show Comments</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-orders" className="nav-link">Show Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-payments" className="nav-link">Show Payments</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-statisticsnik" className="nav-link">Show Statistics Nik</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-statisticsrok" className="nav-link">Show Statistics Rok</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-logsnik" className="nav-link">Show Logs Nik</Link>
            </li>
            <li className="nav-item">
              <Link to="/show-logsrok" className="nav-link">Show Logs Rok</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
