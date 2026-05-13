import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="home-page">
      <h2>Tarkov Kit Builder</h2>
      <p>Build a tarkov kit</p>

      <Link to="/builder">
        <button>Create Loadout</button>
      </Link>
    </div>
  );
}
