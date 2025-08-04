import React, { useState } from "react";

function vendorC1({ activeTab }) {
  const [recentComparisons] = useState([
    {
      id: 1,
      type: "Clothing",
      title: "Nike vs Adidas Running Shoes",
      date: "2025-03-24",
    },
    {
      id: 2,
      type: "Electronics",
      title: "iPhone 15 vs Samsung S24",
      date: "2025-03-22",
    },
    {
      id: 3,
      type: "Cars",
      title: "Toyota Corolla vs Honda Civic",
      date: "2025-03-20",
    },
  ]);
  return (
    <div>
      {activeTab === "comparisons" ? (
        recentComparisons.length > 0 ? (
          <section className="recent-comparisons">
            <h2>Your Recent Comparisons</h2>
            <div className="comparison-list">
              {recentComparisons.map((item) => (
                <div key={item.id} className="comparison-item">
                  <div className="comparison-info">
                    <span className={`type-badge ${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>
                    <h3>{item.title}</h3>
                    <p>Compared on {item.date}</p>
                  </div>
                  <button className="view-btn">
                    <FiRepeat className="icon" /> View Again
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <p className="empty-state">You haven't saved any comparisons yet.</p>
        )
      ) : null}
    </div>
  );
}

export default vendorC1;
