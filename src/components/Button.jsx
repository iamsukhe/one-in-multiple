import React from "react";

export default function Button({ onClick, children, variant = "primary" }) {
  const styles = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: variant === "primary" ? "#007bff" : "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "5px",
  };

  return (
    <button onClick={onClick} style={styles}>
      {children}
    </button>
  );
}
