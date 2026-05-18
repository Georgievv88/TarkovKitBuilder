import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoadoutBuilder } from "./pages/LoadoutBuilder";
import { SavedLoadouts } from "./pages/SavedLoadouts";
import { LoadoutDetails } from "./pages/LoadoutDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./utils/PrivateRoutes";

export function App() {
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  const token = localStorage.getItem("token");
  let user = null;

  try {
    const savedUser = localStorage.getItem("user");
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    localStorage.removeItem("user");
    user = null;
  }

  return (
    <BrowserRouter>
      <nav className="main-nav">
        <div className="nav-left">
          {token ? (
            <p>Logged in as: {user?.username}</p>
          ) : (
            <p>Tarkov Kit Builder</p>
          )}
        </div>

        <div className="nav-center">
          <Link to="/">Home</Link>

          {token && (
            <>
              <Link to="/builder">Loadout Builder</Link>
              <Link to="/loadouts">Saved Loadouts</Link>
            </>
          )}
        </div>

        <div className="nav-right">
          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/builder"
          element={
            <PrivateRoute>
              <LoadoutBuilder />
            </PrivateRoute>
          }
        />

        <Route
          path="/loadouts"
          element={
            <PrivateRoute>
              <SavedLoadouts />
            </PrivateRoute>
          }
        />

        <Route
          path="/loadouts/:id"
          element={
            <PrivateRoute>
              <LoadoutDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
