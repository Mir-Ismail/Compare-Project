// Sidebar.jsx
import React, { useState, useEffect } from "react";
import {
  FiLogOut,
  FiSearch,
  FiRepeat,
  FiBookmark,
  FiBell,
  FiZap,
  FiMenu,
  FiX,
  FiSettings,
  FiUser,
  FiPackage,
  FiTrendingUp,
  FiShoppingCart,
} from "react-icons/fi";
import "../Styles/sidebar.css";
import { useAuth } from "../../public/Context/AuthContext";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-toggle')) {
        setIsOpen(false);
      }
    };

    // Close sidebar on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Close sidebar when tab changes on mobile
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const renderButton = (label, tabKey, Icon) => (
    <button
      className={`nav-item ${activeTab === tabKey ? "active" : ""}`}
      onClick={() => handleTabChange(tabKey)}
    >
      {Icon && <Icon className="nav-icon" />}
      <span className="nav-text">{label}</span>
    </button>
  );

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="username">{user?.username || 'User'}</span>
              <p className="email">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button className="close-sidebar" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="search-container">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-field"
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          {user?.role === "user" && (
            <>
              {renderButton("Saved", "saved", FiBookmark)}
              {renderButton("Order History", "order-history", FiShoppingCart)}
              {renderButton("Favorites", "favorites", FiZap)}
              {renderButton("Profile", "profile", FiUser)}
            </>
          )}

          {user?.role === "vendor" && (
            <>
              {renderButton("Product Management", "product-management", FiPackage)}
              {renderButton("Sales Analytics", "sales-analytics", FiTrendingUp)}
              {renderButton("Upload Product", "upload-product", FiSettings)}
            </>
          )}

          {user?.role === "admin" && (
            <>
              {renderButton("Dashboard", "admin-dashboard", FiTrendingUp)}
              {renderButton("User Management", "user-management", FiUser)}
              {renderButton("Vendor Management", "vendor-management", FiPackage)}
              {renderButton("Supply & Purchase Details", "supply-purchase", FiShoppingCart)}
              {renderButton("Product Moderation", "product-moderation", FiSettings)}
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <FiLogOut className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
