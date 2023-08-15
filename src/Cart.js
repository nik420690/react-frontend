import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRemovingProduct, setIsRemovingProduct] = useState(false);

    const jwtTokenFromStorage = localStorage.getItem('jwtToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenFromStorage}`;
    
    const API_BASE_URL = 'https://cart-5tg9.onrender.com';

    const fetchCartItems = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtTokenFromStorage}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch cart items.');
            }

            if (data && data.products_id) {
                const cartItemsPromises = data.products_id.map(async (productId) => {
                    const productResponse = await fetch(`https://product-045e.onrender.com/products/${productId}`, {
                        headers: {
                            Authorization: `Bearer ${jwtTokenFromStorage}`
                        }
                    });
                    const productData = await productResponse.json();
                    return {
                        id: productData._id,
                        name: productData.name,
                        price: productData.price,
                        quantity: 1
                    };
                });

                let allCartItems = await Promise.all(cartItemsPromises);

                let temp = {};
                allCartItems.forEach((item) => {
                    if (temp[item.id]) {
                        temp[item.id].quantity += 1;
                    } else {
                        temp[item.id] = item;
                    }
                });

                const uniqueCartItems = Object.values(temp);

                setCartItems(uniqueCartItems);
            }

            setIsLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        setIsRemovingProduct(true);

        try {
            const userId = localStorage.getItem('userId');
            const cartResponse = await fetch(`${API_BASE_URL}/carts/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${jwtTokenFromStorage}`
                }
            });

            if (!cartResponse.ok) {
                const data = await cartResponse.json();
                throw new Error(data.error || 'Failed to fetch cart.');
            }

            const cartData = await cartResponse.json();

            const newProductsId = cartData.products_id.filter((productId) => productId !== itemId);

            cartData.products_id = newProductsId;

            const response = await fetch(`${API_BASE_URL}/carts/${cartData._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwtTokenFromStorage}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to remove item.');
            }

            fetchCartItems();
        } catch (error) {
            console.error(error);
        } finally {
            setIsRemovingProduct(false);
        }
    };

    const handleBuyItems = () => {
        console.log('Buying items:', cartItems);
        setCartItems([]);
        window.location.href = 'https://react-frontend-68tc.onrender.com/payment';
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Dashboard />
            <div>
                <h2>Shopping Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemoveItem(item.id)}
                                        disabled={isRemovingProduct}
                                    >
                                        {isRemovingProduct ? 'Removing...' : 'Remove'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" className="text-right">
                                <strong>Total:</strong>
                            </td>
                            <td>
                                <strong>${getTotalPrice().toFixed(2)}</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className="btn btn-primary"
                    onClick={handleBuyItems}
                    disabled={cartItems.length === 0}
                >
                    Buy Items
                </button>
            </div>
        </>
    );
};

export default Cart;
