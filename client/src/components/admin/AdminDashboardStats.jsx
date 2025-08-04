import React, { useState, useEffect } from 'react';
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  if (loading) return <div className="loading">Loading dashboard stats...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!stats) return <div className="error">No stats data available</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Overview of your e-commerce platform</p>
      </div>

      {/* Main Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.userCount}</p>
            <p className="stat-label">Registered customers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon vendors">
            <FiPackage />
          </div>
          <div className="stat-content">
            <h3>Total Vendors</h3>
            <p className="stat-value">{stats.vendorCount}</p>
            <p className="stat-label">Active sellers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">
            <FiShoppingCart />
          </div>
          <div className="stat-content">
            <h3>Active Products</h3>
            <p className="stat-value">{stats.productCount}</p>
            <p className="stat-label">Available for purchase</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <FiDollarSign />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
            <p className="stat-label">Platform earnings</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="metrics-section">
        <div className="metric-card">
          <h3>Order Statistics</h3>
          <div className="metric-value">{stats.totalOrders}</div>
          <p>Total orders placed</p>
        </div>

        <div className="metric-card">
          <h3>Platform Health</h3>
          <div className="health-indicators">
            <div className="health-item">
              <span className="indicator good"></span>
              <span>Users: {stats.userCount > 0 ? 'Active' : 'No users'}</span>
            </div>
            <div className="health-item">
              <span className="indicator good"></span>
              <span>Vendors: {stats.vendorCount > 0 ? 'Active' : 'No vendors'}</span>
            </div>
            <div className="health-item">
              <span className="indicator good"></span>
              <span>Products: {stats.productCount > 0 ? 'Available' : 'No products'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <FiUsers />
            <span>Manage Users</span>
          </button>
          <button className="action-btn">
            <FiPackage />
            <span>Manage Vendors</span>
          </button>
          <button className="action-btn">
            <FiShoppingCart />
            <span>View Orders</span>
          </button>
          <button className="action-btn">
            <FiTrendingUp />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-placeholder">
          <FiTrendingUp size={48} />
          <p>Recent platform activity would be displayed here</p>
          <p>New registrations, orders, and product updates</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStats; 