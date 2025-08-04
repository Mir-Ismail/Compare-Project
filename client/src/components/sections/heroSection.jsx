import React from "react";

function heroSection() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>Welcome to Market Match</h1>
        <p>Smart Comparisons for Smarter Decisions</p>
        <button className="cta-button">
          <span>Get Started</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
      <div className="hero-wave"></div>
    </header>
  );
}

export default heroSection;
