import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoadoutBuilder } from "./pages/LoadoutBuilder";
import { SavedLoadouts } from "./pages/SavedLoadouts";
import { LoadoutDetails } from "./pages/LoadoutDetails";

export function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <br />
        <br />
        <Link to="/builder">Loadout Builder</Link>
        <br />
        <br />
        <Link to="/loadouts">Saved Loadouts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="builder" element={<LoadoutBuilder />} />
        <Route path="/loadouts" element={<SavedLoadouts />} />
        <Route path="/loadouts/:id" element={<LoadoutDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
