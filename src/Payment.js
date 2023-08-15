import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

function CreatePayment() {
    const [userId, setUserId] = useState('');
    const [type, setType] = useState('');
    const [details, setDetails] = useState('');
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchedUserId = localStorage.getItem('userId') || '';
        setUserId(fetchedUserId);
        
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        
        axios.get(`https://cart-5tg9.onrender.com/carts/user/${fetchedUserId}`, { headers })
            .then(response => {
                console.log("Cart response: ", response.data);
            });

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post('https://payment-yvbj.onrender.com/payments', {
                user_id: userId,
                type,
                details,
                amount,
                currency,
                payment_status: paymentStatus
            }, { headers });

            if (response.status === 201) {
                if (userId === '' || userId === null) {
                    console.log("User id is null or empty");
                    return;
                }

                window.location.href = '/confirmation'; 
            } else {
                alert('Payment creation failed');
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            alert('An error occurred while creating the payment');
        }
    };

    return (
      <>
      <Dashboard />
        <div className="container mt-5">
            <h2 className="mb-3">Create Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID:</label>
                    <input disabled type="text" id="userId" className="form-control" value={userId} onChange={e => setUserId(e.target.value)} required />
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
                    <input type="number" id="amount" className="form-control" value={amount} onChange={e => setAmount(Number(e.target.value))} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="currency" className="form-label">Currency:</label>
                    <input type="text" id="currency" className="form-control" value={currency} onChange={e => setCurrency(e.target.value)} required />
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
}

export default CreatePayment;
