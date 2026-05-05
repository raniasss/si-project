"use client";

import React from "react";
import "./AmbientBackground.css";

export const AmbientBackground: React.FC = () => {
  return (
    <div className="ambient-background-container">
      <h1 className="bg-title">IT-FIX</h1>
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
    </div>
  );
};
