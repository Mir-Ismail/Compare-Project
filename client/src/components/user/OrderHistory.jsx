import React, { useState, useEffect } from 'react';
import { FiPackage, FiCalendar, FiDollarSign } from 'react-icons/fi';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order history');
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading">Loading order history...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <div className="empty-state">
          <FiPackage size={48} />
          <p>No orders yet</p>
          <p>Your order history will appear here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>{order.product.name}</h3>
                  <p className="vendor">Vendor: {order.vendor.username}</p>
                  <p className="order-date">
                    <FiCalendar /> {formatDate(order.date)}
                  </p>
                </div>
                <div className="order-status">
                  <span className="status-badge">Completed</span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="product-image">
                  {order.product.images && order.product.images[0] ? (
                    <img src={order.product.images[0]} alt={order.product.name} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                
                <div className="order-summary">
                  <p className="quantity">Quantity: {order.quantity}</p>
                  <p className="price">
                    PKR {order.price} each
                  </p>
                  <p className="total">
                    Total: PKR {(order.price * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="order-actions">
                <button className="btn-secondary">Reorder</button>
                <button className="btn-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 