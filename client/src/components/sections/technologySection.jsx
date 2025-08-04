import React from "react";

function technologySection() {
  return (
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
  );
}

export default technologySection;
