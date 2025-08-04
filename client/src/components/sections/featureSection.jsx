import React from "react";

function featureSection() {
  return (
    <section className="features">
      <h2 className="section-title">What We Offer</h2>
      <div className="features-grid">
        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
          <div
            className="card-bg"
            style={{ backgroundImage: "url('/images/cloth.jpg')" }}
          ></div>
          <div className="card-content">
            <div className="feature-icon">
              <i className="fas fa-tshirt"></i>
            </div>
            <h3>Clothing & Services</h3>
            <p>
              Compare clothes, services, and subscriptions effortlessly with our
              intuitive tools.
            </p>
          </div>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
          <div
            className="card-bg"
            style={{ backgroundImage: "url('/images/car.jpg')" }}
          ></div>
          <div className="card-content">
            <div className="feature-icon">
              <i className="fas fa-car"></i>
            </div>
            <h3>Cars & Prices</h3>
            <p>
              Compare cars, their prices, and availabilities. Buy or sell with
              confidence.
            </p>
          </div>
        </div>
        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
          <div
            className="card-bg"
            style={{ backgroundImage: "url('/images/suggest.jpg')" }}
          ></div>
          <div className="card-content">
            <div className="feature-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Personalized Suggestions</h3>
            <p>
              Get smart suggestions based on your preferences, reviews, and
              current discounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default featureSection;
