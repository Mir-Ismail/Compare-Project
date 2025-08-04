import React from "react";

function vendorC2({ activeTab }) {
  return (
    <div>
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
                <option>Under PKR 15,000</option>
                <option>PKR 15,000 - PKR 30,000</option>
                <option>PKR 30,000 - PKR 150,000</option>
                <option>Above PKR 150,000</option>
              </select>
            </div>
            <button className="apply-filters">Apply Filters</button>
          </div>

          <div className="suggestions-grid">
            <div className="suggestion-card">
              <div
                className="suggestion-image"
                style={{
                  backgroundImage: "url('/images/suggestion1.jpg')",
                }}
              ></div>
              <div className="suggestion-details">
                <h3>Best Running Shoes 2025</h3>
                <p>Top 5 options based on your activity level</p>
                <div className="rating">4.7 ★</div>
                <button className="view-btn">View Comparison</button>
              </div>
            </div>
            <div className="suggestion-card">
              <div
                className="suggestion-image"
                style={{
                  backgroundImage: "url('/images/suggestion2.jpg')",
                }}
              ></div>
              <div className="suggestion-details">
                <h3>Budget Smartphones</h3>
                <p>Best value phones under PKR 90,000</p>
                <div className="rating">4.5 ★</div>
                <button className="view-btn">View Comparison</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default vendorC2;
