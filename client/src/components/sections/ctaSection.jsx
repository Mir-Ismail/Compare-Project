import React from "react";

function ctaSection() {
  return (
    <section className="cta-section">
      <div className="cta-content" data-aos="fade-up">
        <h2>Ready to Make Smarter Decisions?</h2>
        <p>
          Join thousands of users who are already benefiting from our comparison
          tools.
        </p>
        <button className="cta-button secondary">
          <span>Sign Up Now</span>
          <svg width="13px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default ctaSection;
