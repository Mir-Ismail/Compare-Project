import React from 'react';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { 
  FiRepeat, FiBookmark, FiBell, FiZap, 
  FiUser, FiMail, FiChevronDown 
} from 'react-icons/fi';
import '../Styles/sidebar.css';
import { useEffect, useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } else {
      setCurrentUser(user);
    }
  }, [user]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="avatar">
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h3 className="username">{currentUser?.username}</h3>
            <p className="email">{currentUser?.email}</p>
          </div>
          <button className="dropdown-btn">
            <FiChevronDown />
          </button>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeTab === 'comparisons' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparisons')}
        >
          <FiRepeat className="nav-icon" />
          <span className="nav-text">Comparisons</span>
        </button>
        
        <button
          className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <FiBookmark className="nav-icon" />
          <span className="nav-text">Saved</span>
        </button>
        
        <button
          className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <FiBell className="nav-icon" />
          <span className="nav-text">Price Alerts</span>
        </button>
        
        <button
          className={`nav-item ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          <FiZap className="nav-icon" />
          <span className="nav-text">Suggestions</span>
        </button>
      </nav>

      {/* Footer with Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <FiLogOut className="logout-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;