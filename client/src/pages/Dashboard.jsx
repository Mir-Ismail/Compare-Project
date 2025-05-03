// Dashboard.jsx
import React, { useState } from "react";
import "../Styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import ComparisonCard from "../components/ComparisonCard";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("comparisons");
  const [recentComparisons, setRecentComparisons] = useState([
    { id: 1, type: "Clothing", title: "Nike vs Adidas Running Shoes", date: "2025-03-24" },
    { id: 2, type: "Electronics", title: "iPhone 15 vs Samsung S24", date: "2025-03-22" },
    { id: 3, type: "Cars", title: "Toyota Corolla vs Honda Civic", date: "2025-03-20" },
  ]);

  const [savedComparisons, setSavedComparisons] = useState([
    { id: 4, type: "Groceries", title: "Local Market vs Online Stores" },
    { id: 5, type: "Services", title: "Netflix vs Amazon Prime" },
  ]);

  const [priceAlerts, setPriceAlerts] = useState([
    { id: 1, product: "Sony WH-1000XM5", currentPrice: "$299", targetPrice: "$250", status: "active" },
    { id: 2, product: "MacBook Air M2", currentPrice: "$999", targetPrice: "$899", status: "active" },
  ]);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        user={user}
      />
      
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome back!</h1>
          <p>Make smarter decisions with real-time comparisons</p>
          <div className="quick-stats">
            <div className="stat-card">
              <h3>5</h3>
              <p>Recent Comparisons</p>
            </div>
            <div className="stat-card">
              <h3>3</h3>
              <p>Saved Comparisons</p>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <p>Active Price Alerts</p>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="dashboard-content">
          {activeTab === "comparisons" && (
            <>
              <section className="quick-comparison">
                <h2>Quick Comparison</h2>
                <div className="comparison-types">
                  <ComparisonCard 
                    icon="fas fa-tshirt"
                    title="Clothing"
                    description="Compare brands, prices, and reviews"
                  />
                  <ComparisonCard 
                    icon="fas fa-car"
                    title="Vehicles"
                    description="Compare cars, specs, and prices"
                  />
                  <ComparisonCard 
                    icon="fas fa-mobile-alt"
                    title="Electronics"
                    description="Compare tech specs and deals"
                  />
                  <ComparisonCard 
                    icon="fas fa-utensils"
                    title="Groceries"
                    description="Compare prices across stores"
                  />
                </div>
              </section>

              <section className="recent-comparisons">
                <h2>Your Recent Comparisons</h2>
                <div className="comparison-list">
                  {recentComparisons.map(item => (
                    <div key={item.id} className="comparison-item">
                      <div className="comparison-info">
                        <span className={`type-badge ${item.type.toLowerCase()}`}>
                          {item.type}
                        </span>
                        <h3>{item.title}</h3>
                        <p>Compared on {item.date}</p>
                      </div>
                      <button className="view-btn">View Again</button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "saved" && (
            <section className="saved-comparisons">
              <h2>Your Saved Comparisons</h2>
              {savedComparisons.length > 0 ? (
                <div className="comparison-list">
                  {savedComparisons.map(item => (
                    <div key={item.id} className="comparison-item">
                      <div className="comparison-info">
                        <span className={`type-badge ${item.type.toLowerCase()}`}>
                          {item.type}
                        </span>
                        <h3>{item.title}</h3>
                      </div>
                      <div className="action-buttons">
                        <button className="view-btn">View</button>
                        <button className="delete-btn">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">You haven't saved any comparisons yet.</p>
              )}
            </section>
          )}

          {activeTab === "alerts" && (
            <section className="price-alerts">
              <h2>Your Price Alerts</h2>
              {priceAlerts.length > 0 ? (
                <>
                  <div className="alert-list">
                    {priceAlerts.map(alert => (
                      <div key={alert.id} className="alert-item">
                        <div className="alert-info">
                          <h3>{alert.product}</h3>
                          <div className="price-details">
                            <span>Current: {alert.currentPrice}</span>
                            <span>Target: {alert.targetPrice}</span>
                          </div>
                          <span className={`status-badge ${alert.status}`}>
                            {alert.status}
                          </span>
                        </div>
                        <div className="alert-actions">
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="add-alert-btn">
                    <i className="fas fa-plus"></i> Create New Alert
                  </button>
                </>
              ) : (
                <div className="empty-state">
                  <p>You don't have any active price alerts.</p>
                  <button className="add-alert-btn">
                    <i className="fas fa-plus"></i> Create Your First Alert
                  </button>
                </div>
              )}
            </section>
          )}

          {activeTab === "suggestions" && (
            <section className="personalized-suggestions">
              <h2>Personalized Suggestions</h2>
              <div className="suggestion-filters">
                <div className="filter-group">
                  <label>Category:</label>
                  <select>
                    <option>All Categories</option>
                    <option>Clothing</option>
                    <option>Electronics</option>
                    <option>Vehicles</option>
                    <option>Groceries</option>
                    <option>Services</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Budget:</label>
                  <select>
                    <option>Any Budget</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>$100 - $500</option>
                    <option>Above $500</option>
                  </select>
                </div>
                <button className="apply-filters">Apply Filters</button>
              </div>
              
              <div className="suggestions-grid">
                <div className="suggestion-card">
                  <div className="suggestion-image" style={{ backgroundImage: "url('/images/suggestion1.jpg')" }}></div>
                  <div className="suggestion-details">
                    <h3>Best Running Shoes 2025</h3>
                    <p>Top 5 options based on your activity level</p>
                    <div className="rating">4.7 ★</div>
                    <button className="view-btn">View Comparison</button>
                  </div>
                </div>
                <div className="suggestion-card">
                  <div className="suggestion-image" style={{ backgroundImage: "url('/images/suggestion2.jpg')" }}></div>
                  <div className="suggestion-details">
                    <h3>Budget Smartphones</h3>
                    <p>Best value phones under $300</p>
                    <div className="rating">4.5 ★</div>
                    <button className="view-btn">View Comparison</button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;