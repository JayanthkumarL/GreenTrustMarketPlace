import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products?search=${search}&sort=${sort}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchProducts();
  }, [search, sort]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in!');
    try {
      await axios.post('http://localhost:5000/api/cart/add', { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Added to cart!');
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-content">
        <h2>Available Products</h2>
        <div className="search-sort">
          <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price">Price (Low to High)</option>
          </select>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p className="description">{product.description}</p>
              <p className="price">${product.price}</p>
              {product.imageUrl && <img src={product.imageUrl} alt={product.title} />}
              <p className="details">Condition: {product.condition}</p>
              <p className="details">Material: {product.material}</p>
              <p className="green-score">Green Score: {product.greenScore}/100</p>
              <p className="details">Posted by: {product.User?.username}</p>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;