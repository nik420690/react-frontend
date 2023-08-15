import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

const CreatePayment = () => {
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency] = useState('USD');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');

    // Check if userId exists in local storage
    if (!userIdFromStorage) {
        console.error("User ID not found in local storage.");
        // You can handle the error as required, maybe set a default value or redirect the user
        // For now, I'm just returning early to stop further execution
        return;
    }

    setUserId(userIdFromStorage);
  
    const tokenFromStorage = localStorage.getItem('jwtToken');
  
    const authAxios = axios.create({
      headers: {
        'Authorization': `Bearer ${tokenFromStorage}`
      }
    });
  
    authAxios.get(`http://localhost:8000/users/${userIdFromStorage}`)
      .then(response => {
        if (response.data._id) {  // Check if the _id exists before setting it
          setUserId(response.data._id);
        }
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        // You can set a default value or error message here if needed
      });
  
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentData = {
        user_id: userId,
        type: type,
        details: details,
        amount: amount,
        currency: currency,
        payment_status: paymentStatus
    };

    const token = localStorage.getItem('jwtToken');
    const headers = {
        Authorization: `Bearer ${token}`
    };

    axios.get(`http://localhost:3088/payments/user/${userId}`, { headers: headers })
        .then(response => {
            // Check if payment data is received
            if (response.data) {
                console.log("Updating existing payment for user:", userId);
                return axios.put(`http://localhost:3088/payments/user/${userId}`, paymentData, { headers: headers });
            } else {
                throw new Error('No existing payment data found for user.');
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.log("Creating new payment for user:", userId);
                return axios.post('http://localhost:3088/payments', paymentData, { headers: headers });
            }
            throw error;
        })
        .then(response => {
            if (response.data.message) {
                alert(response.data.message);
                window.location.href ="/confirmation";
            }
        })
        .catch(error => {
            console.error("Error processing payment:", error);
            alert("Error processing payment. Please try again.");
        });
  };

  return (
    <>
      <Dashboard />
      <div className="container mt-5">
        <h2 className="mb-3">Create Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID:</label>
            <input type="text" id="userId" className="form-control" value={userId} readOnly required />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type:</label>
            <input type="text" id="type" className="form-control" value={type} onChange={e => setType(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="details" className="form-label">Details:</label>
            <input type="text" id="details" className="form-control" value={details} onChange={e => setDetails(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount:</label>
            <input type="number" id="amount" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="mb-3">
              <label htmlFor="currency" className="form-label">Currency:</label>
              <input 
                type="text" 
                id="currency" 
                className="form-control" 
                value={currency} 
                readOnly  // Make this field read-only
                required 
              />
            </div>
          <div className="mb-3">
            <label htmlFor="paymentStatus" className="form-label">Payment Status:</label>
            <input type="text" id="paymentStatus" className="form-control" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Create Payment</button>
        </form>
      </div>
    </>
  );
};

export default CreatePayment;
