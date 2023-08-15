import React, { useEffect } from 'react';
import axios from 'axios';

function OrderConfirmation() {
    useEffect(() => {
        const getHeaders = () => {
            const token = localStorage.getItem('jwtToken');
            return {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
        };
        const userId = localStorage.getItem("userId");

        const postData = async () => {
            try {
                const response = await axios.get(`https://cart-5tg9.onrender.com/carts/user/${userId}`, {
                    headers: getHeaders(),
                });

                if (response.status === 401) {
                    console.error('Authorization failed:', response.statusText);
                    return;
                }

                const data = response.data;

                const post_order = {
                    "userId": data.user_id,
                    "productIds": data.products_id,
                    "status": 'pending',
                };

                const postOrderResponse = await axios.post('https://order-ps5n.onrender.com/order/post/order', post_order, {
                    headers: getHeaders(),
                });

                if (postOrderResponse.status === 200) {
                    alert('Order successfully created');
                    await axios.delete(`https://cart-5tg9.onrender.com/carts/${data.id}`, {
                        headers: getHeaders(),
                    });
                } else {
                    console.error('Order creation failed:', postOrderResponse.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        postData();
    }, []);

    return (
        <div className="centeredContainer">
            <div className="innerContent">
                <h2>Order Confirmation</h2>
                <p id="order">Your order has been successfully created!</p>
                <p>Thank you for your purchase.</p>
                <a href="/show-products" className="linkStyle">Back to Products</a>
            </div>

            <style>
                {`
                    .centeredContainer {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        font-family: Arial, sans-serif;
                    }
                    .innerContent {
                        border: 1px solid #ddd;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        width: 70%;
                        max-width: 600px;
                        text-align: center;
                    }
                    .linkStyle {
                        text-decoration: none;
                        color: #007BFF;
                        padding: 10px 20px;
                        border: 1px solid #007BFF;
                        border-radius: 3px;
                        margin-top: 15px;
                        display: inline-block;
                        transition: background-color 0.3s, color 0.3s;
                    }
                    .linkStyle:hover {
                        background-color: #007BFF;
                        color: white;
                    }
                `}
            </style>
        </div>
    );
}

export default OrderConfirmation;
