import React, { useState } from "react";
import api from "../api/api";

export function ItemSearch({ onAddItem }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");

    if (!search.trim()) return;

    try {
      const res = await api.get(
        `/tarkov/search?search=${encodeURIComponent(search)}`,
      );

      setItems(res.data);
    } catch (error) {
      console.log("Search failed:", error);
      setError(error.response?.data?.message || "Search failed");
    }
  }

  return (
    <div>
      <h2>Search for items</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p className="auth-error">{error}</p>}

      <div>
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.iconLink} alt={item.name} />

            <h3>{item.name}</h3>

            <p>
              Price: ₽ {item.avg24hPrice || item.lastLowPrice || item.basePrice}
            </p>

            <p>Weight: {item.weight} kg</p>

            <button onClick={() => onAddItem(item)}>Add to loadout</button>
          </div>
        ))}
      </div>
    </div>
  );
}
