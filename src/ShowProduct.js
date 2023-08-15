import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const ShowProduct = () => {
    const [products, setProducts] = useState([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false);

    const jwtTokenFromStorage = localStorage.getItem('jwtToken') || '';

    const fetchProducts = () => {
        fetch('http://localhost:3000/products', {
            headers: {
                Authorization: `Bearer ${jwtTokenFromStorage}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const products = data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                }));
                setProducts(products);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = (productId) => {
        setIsAddingProduct(true);

        const userId = localStorage.getItem('userId');

        fetch('http://localhost:3032/carts/user/' + userId, {
            headers: {
                Authorization: `Bearer ${jwtTokenFromStorage}`,
            },
        })
            .then((res) => {
                if (res.status === 404) {
                    const requestBody = {
                        user_id: userId,
                        products_id: [productId],
                    };

                    return fetch('http://localhost:3032/carts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwtTokenFromStorage}`,
                        },
                        body: JSON.stringify(requestBody),
                    })
                        .then((res) => res.json());
                }

                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((cartData) => {
                if (cartData) {
                    if (!cartData.products_id) {
                        cartData.products_id = [];
                    }

                    cartData.products_id.push(productId);

                    return fetch('http://localhost:3032/carts/' + cartData._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwtTokenFromStorage}`,
                        },
                        body: JSON.stringify(cartData),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsAddingProduct(false);
            });
    };

    return (
        <>
            <Dashboard /> {/* Render the Dashboard component */}
            <div className="container mt-5">
                <h2 className="mb-3">Products</h2>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddProduct(product.id)}
                                        disabled={isAddingProduct}
                                    >
                                        {isAddingProduct ? 'Adding...' : 'Add'}
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

export default ShowProduct;
