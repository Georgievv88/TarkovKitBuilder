import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";

export function SavedLoadouts() {
  const [loadouts, setLoadouts] = useState([]);

  useEffect(() => {
    getLoadouts();
  }, []);

  async function getLoadouts() {
    try {
      const res = await api.get("/loadouts");
      setLoadouts(res.data);
    } catch (error) {
      console.log("Failed to get loadouts:", error);
    }
  }
  async function deleteLoadout(id) {
    await api.delete(`/loadouts/${id}`);

    setLoadouts(loadouts.filter((loadout) => loadout._id !== id));
  }

  return (
    <div id="saved-loadouts">
      <h2>Saved Loadouts</h2>

      {loadouts.length === 0 && <p>Saved kits will be shown here</p>}

      {loadouts.map((loadout) => (
        <div key={loadout._id}>
          <h3>{loadout.name}</h3>

          <p>Total Cost: ₽{loadout.totalCost}</p>
          <p>Total Weight: {loadout.totalWeight?.toFixed(2)} kg</p>

          <h4>Items:</h4>

          {!Array.isArray(loadout.items) || loadout.items.length === 0 ? (
            <p>No items saved for this loadout.</p>
          ) : (
            loadout.items.map((item) => (
              <div className="loadout-card" key={item._id}>
                <img src={item.iconLink} alt={item.name} width="48" />
                <p>
                  {item.name} x{item.quantity} - ₽{item.price}
                </p>
              </div>
            ))
          )}

          <Link to={`/loadouts/${loadout._id}`}>
            <button>View Details</button>
          </Link>

          <button
            className="danger-btn"
            onClick={() => deleteLoadout(loadout._id)}
          >
            Delete Loadout
          </button>
        </div>
      ))}
    </div>
  );
}
