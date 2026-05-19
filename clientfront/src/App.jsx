import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { LoadoutBuilder } from "./pages/LoadoutBuilder";
import { SavedLoadouts } from "./pages/SavedLoadouts";
import { LoadoutDetails } from "./pages/LoadoutDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./utils/PrivateRoutes";

function AppContent() {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(() => {
    function updateAuthState() {
      setToken(localStorage.getItem("token"));

      try {
        const savedUser = localStorage.getItem("user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      }
    }

    window.addEventListener("authChanged", updateAuthState);

    return () => {
      window.removeEventListener("authChanged", updateAuthState);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/login");
  }

  return (
    <>
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
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
