import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateProduct.css';

function CreateProduct() {
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', condition: 'used', material: 'mixed', image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in!');
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    try {
      const res = await axios.post('http://localhost:5000/api/products', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Product created! ID: ${res.data.id}`);
      setFormData({ title: '', description: '', price: '', condition: 'used', material: 'mixed', image: null });
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-container">
      <form onSubmit={handleSubmit} className="create-product-form">
        <h2>Create Product</h2>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} step="0.01" required />
        <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <select name="material" value={formData.material} onChange={handleChange}>
          <option value="organic">Organic</option>
          <option value="plastic">Plastic</option>
          <option value="mixed">Mixed</option>
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Product'}</button>
      </form>
    </div>
  );
}

export default CreateProduct;