import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard'; // Import the AdminDashboard component


const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const jwtTokenFromStorage = localStorage.getItem('jwtToken');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post the data to the API, localhost:3000/products
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${jwtTokenFromStorage}`,
      },
      body: JSON.stringify({ name, price, description }),
    })
      .then(() => {
        // Clear the form
        setName('');
        setPrice('');
        setDescription('');
        alert('Product added successfully!');
      }
      )
      .catch((err) => {
        console.error(err);
      }
      );
      
  };

  return (
    <>
    <AdminDashboard /> {/* Render the AdminDashboard component */}
    <div className="container mt-5">
      <h2 className="mb-3">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
    </>
  );
};

export default AddProduct;
