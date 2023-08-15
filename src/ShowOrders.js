import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the backend when the component mounts
    axios
      .get('https://localhost:44361/order/get/All')
      .then((response) => {
        console.log(response.data); // Log the API response to check the data structure
        setOrders(response.data);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the backend
    axios
      .delete(`https://localhost:44361/order/delete/byID?Id=${id}`)
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // After successful deletion, update the orders state to remove the deleted order from the list
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      })
      .catch((error) => console.error('Error deleting order:', error));
  };

  return (
    <>
      <AdminDashboard />
      <div className="container mt-5">
        <h2 className="mb-3">Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product IDs</th>
              <th>Status</th>
              <th>User ID</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.ProductIds.join(', ')}</td>
                <td>{order.Status}</td> {/* Correct the field name to 'Status' */}
                <td>{order.userId}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ShowOrders;