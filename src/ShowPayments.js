import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';


const ShowPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Get the token from local storage
    // Fetch payments data from the backend when the component mounts
    axios
      .get('http://localhost:3088/payments/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }) 
      .then((response) => setPayments(response.data)) // Extract the data from the response
      .catch((error) => console.error('Error fetching payments:', error));
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('jwtToken'); // Get the token from local storage
    // Send a DELETE request to the backend
    axios
      .delete(`http://localhost:3088/payments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data); // Log the success message from the backend if needed
        // After successful deletion, update the payments state to remove the deleted payment from the list
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== id));
      })
      .catch((error) => console.error('Error deleting payment:', error));
  };

  return (
    <>
      <AdminDashboard />
      <div className="container mt-5">
        <h2 className="mb-3">Payments</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Type</th>
              <th>Details</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Payment Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.user_id}</td>
                <td>{payment.type}</td>
                <td>{payment.details}</td>
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.payment_status}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(payment._id)}>
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

export default ShowPayments;
