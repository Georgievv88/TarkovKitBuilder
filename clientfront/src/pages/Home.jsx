import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const token = localStorage.getItem("token");

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-left">
          <p className="home-kicker">Tarkov Loadout Planning System</p>

          <h1>Tarkov Kit Builder</h1>

          <p className="home-subtitle">
            Build raid kits, track ruble cost, calculate weight, and save your
            favorite loadouts to your account.
          </p>

          <div className="home-actions">
            <Link to={token ? "/builder" : "/register"}>
              <button>{token ? "Start Building" : "Create Account"}</button>
            </Link>

            <Link to={token ? "/loadouts" : "/login"}>
              <button className="secondary-btn">
                {token ? "View Saved Loadouts" : "Login"}
              </button>
            </Link>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="status-panel">
            <div className="status-panel-header">
              <span>PMC STATUS</span>
              <span className="online-dot">ONLINE</span>
            </div>

            <div className="status-row">
              <span>Market Pricing</span>
              <strong>Enabled</strong>
            </div>

            <div className="status-row">
              <span>Weight Tracking</span>
              <strong>Ready</strong>
            </div>

            <div className="status-row">
              <span>Saved Kits</span>
              <strong>Account Linked</strong>
            </div>

            <div className="status-row">
              <span>Raid Prep</span>
              <strong>Standing By</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-feature-grid">
        <div className="home-feature-card">
          <h3>Build Loadouts</h3>
          <p>
            Search items and add weapons, armor, rigs, helmets, backpacks, and
            gear into one kit.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Track Cost</h3>
          <p>
            See your total ruble cost before you save the kit or take it into
            raid.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Visual Gear Layout</h3>
          <p>
            Your selected items appear on a Tarkov-style gear layout for easy
            review.
          </p>
        </div>

        <div className="home-feature-card">
          <h3>Account Storage</h3>
          <p>
            Register, log in, and keep your saved loadouts connected to your own
            account.
          </p>
        </div>
      </section>
    </main>
  );
}
