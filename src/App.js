import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Dashboard from './Dashboard';
import Login from './Login';
import Cart from './Cart';
import Products from './Products';
import Register from './Register';
import AdminDashboard from './AdminDashboard';
import AddUser from './AddUser';
import Users from './Users';
import AddProduct from './AddProduct';
import ShowProduct from './ShowProduct';
import AddComments from './AddComments';
import ShowComments from './ShowComments';
import ShowOrders from './ShowOrders';
import ShowPayments from './ShowPayments';
import ShowStatisticsNik from './ShowStatisticsNik';
import ShowStatisticsRok from './ShowStatisticsRok';
import ShowLogsNik from './ShowLogsNik';
import ShowLogsRok from './ShowLogsRok';
import Payment from './Payment';
import Confirmation from './Confirmation';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the Login component */}
          <Route path="/login" element={<Login />} />
          {/* Route for the Home component */}
          <Route path="/" element={<HomePage />} />
          {/* Route for the About component */}
          <Route path="/about" element={<AboutPage />} />
          {/* Route for the Dashboard component */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/show-products" element={<ShowProduct />} />
          <Route path="/add-comments" element={<AddComments />} />
          <Route path="/show-comments" element={<ShowComments />} />
          <Route path="/show-orders" element={<ShowOrders />} />
          <Route path="/show-payments" element={<ShowPayments />} />
          <Route path="/show-statisticsnik" element={<ShowStatisticsNik />} />
          <Route path="/show-statisticsrok" element={<ShowStatisticsRok />} />
          <Route path="/show-logsnik" element={<ShowLogsNik />} />
          <Route path="/show-logsrok" element={<ShowLogsRok />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
