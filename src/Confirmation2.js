import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';

const OrderConfirmation = () => {
    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            console.error('No token found in localStorage!');
            return;
        }

        if (userIdFromStorage) {
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            console.log("User ID from Storage:", userIdFromStorage);
            axios.get(`http://localhost:3032/carts/user/${userIdFromStorage}`, { headers })
                .then(response => {
                    // Check if the response data exists
                    if (!response.data) {
                        throw new Error("Cart might be empty.");
                    }
        
                    // Check the expected structure of the response
                    if (!response.data.user_id || !response.data.products_id) {
                        throw new Error("Unexpected response data structure from the server.");
                    }
        
                    const post_order = {
                        userId: response.data.user_id,
                        productIds: response.data.products_id,
                        status: "pending"
                    };
        
                    return axios.post("http://localhost:44361/order/post/order", post_order, { headers });
                })
                .then(response => {
                    console.log(response.data);
                    alert("success");
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        } else {
            console.error("No userId found in localStorage!");
        }
    }, []);

    return (
        <>
            <Dashboard />
            
            <div className="confirmation-box">
                <h2>Order Confirmation</h2>
                <p id="order">Your order has been successfully created!</p>
                <p>Thank you for your purchase.</p>

                <a href="/show-products">Back to Products</a>
            </div>
        </>
    );
}

export default OrderConfirmation;
