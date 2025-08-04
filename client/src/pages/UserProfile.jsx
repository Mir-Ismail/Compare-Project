import React, { useState, useEffect } from "react";
import "./profile.css";

function UserProfile({ user, onLogout }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Initialize form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords if changing
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      setMessage({ text: "New passwords don't match", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          currentPassword: formData.password,
          newPassword: formData.newPassword,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      setMessage({ text: "Profile updated successfully", type: "success" });
      setEditMode(false);
      // You might want to update the user context/state here
    } catch (error) {
      setMessage({
        text: error.message || "Failed to update profile",
        type: "error",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "Not available";
    }
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        {!editMode && (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Password (required for changes)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password (leave blank to keep current)</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditMode(false);
                setMessage({ text: "", type: "" });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Username:</span>
            <span className="detail-value">{user.username || "Not set"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email || "Not set"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Account Type:</span>
            <span className="detail-value">{user.role || "User"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">
              {formatDate(user.createdAt)}
            </span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
