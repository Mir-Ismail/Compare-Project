import React, { useState, useEffect } from 'react';
import { FiHeart, FiTrash2, FiShoppingCart, FiEye } from 'react-icons/fi';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/user/favorites/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      // Remove from local state
      setFavorites(prev => prev.filter(item => item.product._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading favorites...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="favorites">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty-state">
          <FiHeart size={48} />
          <p>No favorites yet</p>
          <p>Products you favorite will appear here</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((item) => (
            <div key={item._id} className="favorite-card">
              <div className="favorite-image">
                {item.product.images && item.product.images[0] ? (
                  <img src={item.product.images[0]} alt={item.product.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
                <div className="favorite-overlay">
                  <button 
                    className="remove-favorite"
                    onClick={() => removeFromFavorites(item.product._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              
              <div className="favorite-details">
                <h3>{item.product.name}</h3>
                <p className="description">{item.product.description}</p>
                <div className="price-section">
                  <span className="price">PKR {item.product.price}</span>
                  <span className="stock">In Stock: {item.product.quantity}</span>
                </div>
                
                <div className="favorite-actions">
                  <button className="btn-primary">
                    <FiShoppingCart /> Add to Cart
                  </button>
                  <button className="btn-secondary">
                    <FiEye /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 