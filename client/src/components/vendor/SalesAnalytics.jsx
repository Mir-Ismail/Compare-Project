import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingCart, FiPackage } from 'react-icons/fi';

const SalesAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/vendor/analytics?period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data);
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

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!analytics) return <div className="error">No analytics data available</div>;

  return (
    <div className="sales-analytics">
      <div className="analytics-header">
        <h2>Sales Analytics</h2>
        <div className="period-selector">
          <label>Time Period:</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="hour">Last Hour</option>
            <option value="day">Last Day</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="card-icon">
            <FiDollarSign />
          </div>
          <div className="card-content">
            <h3>Total Sales</h3>
            <p className="card-value">{formatCurrency(analytics.totalSales)}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">
            <FiShoppingCart />
          </div>
          <div className="card-content">
            <h3>Total Orders</h3>
            <p className="card-value">{analytics.totalOrders}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">
            <FiPackage />
          </div>
          <div className="card-content">
            <h3>Items Sold</h3>
            <p className="card-value">{analytics.totalItems}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">
            <FiTrendingUp />
          </div>
          <div className="card-content">
            <h3>Average Order Value</h3>
            <p className="card-value">
              {analytics.totalOrders > 0 
                ? formatCurrency(analytics.totalSales / analytics.totalOrders)
                : formatCurrency(0)
              }
            </p>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="product-performance">
        <h3>Product Performance</h3>
        {analytics.productSales.length === 0 ? (
          <div className="empty-state">
            <p>No sales data for this period</p>
          </div>
        ) : (
          <div className="product-sales-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity Sold</th>
                  <th>Revenue</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analytics.productSales.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{formatCurrency(product.revenue)}</td>
                    <td>
                      {analytics.totalSales > 0 
                        ? `${((product.revenue / analytics.totalSales) * 100).toFixed(1)}%`
                        : '0%'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sales Chart Placeholder */}
      <div className="sales-chart">
        <h3>Sales Trend</h3>
        <div className="chart-placeholder">
          <FiTrendingUp size={48} />
          <p>Sales chart visualization would go here</p>
          <p>Period: {period}</p>
        </div>
      </div>

      {/* Insights */}
      <div className="analytics-insights">
        <h3>Key Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Best Performing Product</h4>
            <p>
              {analytics.productSales.length > 0 
                ? analytics.productSales.reduce((best, current) => 
                    current.revenue > best.revenue ? current : best
                  ).name
                : 'No data available'
              }
            </p>
          </div>
          
          <div className="insight-card">
            <h4>Sales Efficiency</h4>
            <p>
              {analytics.totalOrders > 0 
                ? `${analytics.totalItems / analytics.totalOrders} items per order`
                : 'No orders yet'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics; 