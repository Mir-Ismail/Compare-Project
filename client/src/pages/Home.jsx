import React from "react";
import "../Styles/Home.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/heroSection";
import FeatureSection from "../components/sections/featureSection";
import TechnologySection from "../components/sections/technologySection";
import CtaSection from "../components/sections/ctaSection";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />
      {/* Technologies Section */}
      <TechnologySection />
      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Home;
