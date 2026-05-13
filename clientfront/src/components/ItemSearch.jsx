import React, { useState, useEffect } from "react";
import axios from "axios";

export function ItemSearch({ onAddItem }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    console.log("Search clicked");
    console.log("Search value:", search);

    if (!search.trim()) return;

    const res = await axios.get(
      `http://localhost:5000/api/tarkov/search?search=${search}`,
    );

    setItems(res.data);
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
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>
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
