import React, { useState, useEffect } from 'react';
import { FiUsers, FiMail, FiCalendar, FiSearch } from 'react-icons/fi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      <div className="list-header">
        <h2>User Management</h2>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-item">
          <FiUsers />
          <span>Total Users: {users.length}</span>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <FiUsers size={48} />
          <p>No users found</p>
          {searchTerm && <p>Try adjusting your search terms</p>}
        </div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td>
                    <div className="email-cell">
                      <FiMail />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <FiCalendar />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="user-actions">
                      <button className="btn-secondary">View</button>
                      <button className="btn-primary">Edit</button>
                      <button className="btn-danger">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Modal Placeholder */}
      <div className="modal-placeholder">
        <p>User details modal would appear here when "View" is clicked</p>
      </div>
    </div>
  );
};

export default UserList; 