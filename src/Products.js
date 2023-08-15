import React, { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';
import axios from 'axios';

const API_URL = 'https://product-045e.onrender.com/products/';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const token = localStorage.getItem('jwtToken');
    const handleNameChange = (event) => {
    setEditedProduct((prev) => ({ ...prev, name: event.target.value }));
};

const handleDescriptionChange = (event) => {
    setEditedProduct((prev) => ({ ...prev, description: event.target.value }));
};

const handlePriceChange = (event) => {
    setEditedProduct((prev) => ({ ...prev, price: event.target.value }));
};

const handleCancelEdit = () => {
    setEditedProduct(null);
};

const handleDelete = (id) => {
    axios.delete(`${API_URL}${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(() => {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    })
    .catch((error) => {
        console.error(error);
    });
};





    const handleEdit = (product) => {
        setEditedProduct(product);
    };

    const handleSave = () => {
        if (!editedProduct || !editedProduct.id) return;
        axios.put(`${API_URL}${editedProduct.id}`, editedProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editedProduct.id ? response.data : product
                )
            );
            setEditedProduct(null);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setProducts(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    }, [token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AdminDashboard />
            <div className="container mt-5">
                <h2 className="mb-3">Products</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    {editedProduct && editedProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.name}
                                            onChange={handleNameChange}
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {editedProduct && editedProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.description}
                                            onChange={handleDescriptionChange}
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td>
                                    {editedProduct && editedProduct.id === product.id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.price}
                                            onChange={handlePriceChange}
                                        />
                                    ) : (
                                        product.price
                                    )}
                                </td>
                                <td>
                                    {editedProduct && editedProduct.id === product.id ? (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(product)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(product.id)}
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

export default ShowProducts;
