import React from "react";
import "../Styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}

      {/* Hero Section */}
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

      {/* Features Section */}
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
                Compare clothes, services, and subscriptions effortlessly with
                our intuitive tools.
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

      {/* Technologies Section */}
      <section className="technologies">
        <h2 className="section-title">Built With Modern Technologies</h2>
        <div className="tech-grid">
          {[
            { name: "React", icon: "/images/react-logo.png" },
            { name: "Node.js", icon: "/images/node-logo.png" },
            { name: "Docker", icon: "/images/docker-logo.png" },
            { name: "Android", icon: "/images/android-logo.png" },
            { name: "VS Code", icon: "/images/vscode-logo.png" },
          ].map((tech, index) => (
            <div
              className="tech-card"
              key={tech.name}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="tech-icon">
                <img src={tech.icon} alt={tech.name} />
              </div>
              <h3>{tech.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content" data-aos="fade-up">
          <h2>Ready to Make Smarter Decisions?</h2>
          <p>
            Join thousands of users who are already benefiting from our
            comparison tools.
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
    </div>
  );
};

export default Home;
