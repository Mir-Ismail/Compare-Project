import React, { useState, useEffect } from 'react';
import { FiPackage, FiMail, FiCalendar, FiSearch, FiTrendingUp } from 'react-icons/fi';

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/vendors', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }

      const data = await response.json();
      setVendors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading vendors...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="vendor-list">
      <div className="list-header">
        <h2>Vendor Management</h2>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <FiPackage />
          <span>Total Vendors: {vendors.length}</span>
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <div className="empty-state">
          <FiPackage size={48} />
          <p>No vendors found</p>
          {searchTerm && <p>Try adjusting your search terms</p>}
        </div>
      ) : (
        <div className="vendors-table">
          <table>
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td>
                    <div className="vendor-info">
                      <div className="vendor-avatar">
                        {vendor.username.charAt(0).toUpperCase()}
                      </div>
                      <span>{vendor.username}</span>
                    </div>
                  </td>
                  <td>
                    <div className="email-cell">
                      <FiMail />
                      <span>{vendor.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <FiCalendar />
                      <span>{formatDate(vendor.createdAt)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="performance-cell">
                      <FiTrendingUp />
                      <span>Good</span>
                    </div>
                  </td>
                  <td>
                    <div className="vendor-actions">
                      <button className="btn-secondary">View</button>
                      <button className="btn-primary">Edit</button>
                      <button className="btn-warning">Suspend</button>
                      <button className="btn-danger">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vendor Performance Modal Placeholder */}
      <div className="modal-placeholder">
        <p>Vendor performance details and product management would appear here</p>
      </div>
    </div>
  );
};

export default VendorList; 