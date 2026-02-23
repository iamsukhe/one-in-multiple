import React from "react";
import { Link } from "react-router-dom";

export default function GameWrapper({ title, children }) {
  return (
    <div
      className="game-container"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
          ⬅ Back to Arcade
        </Link>
        <h2>{title}</h2>
      </header>

      {/* The actual game renders inside this main tag */}
      <main className="game-screen">{children}</main>
    </div>
  );
}
