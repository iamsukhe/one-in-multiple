import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">System Info</h2>

      <p className="about-text">
        This is my journey to build 99 mini-games using React! <br />
        <br />
        Level by level, component by component, I am bringing the classic retro
        arcade experience into the modern web browser. Ready player one?
      </p>

      <Link to="/" className="back-link">
        ⬅ Return to Menu
      </Link>
    </div>
  );
}
