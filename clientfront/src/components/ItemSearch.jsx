import React, { useEffect, useState } from "react";
import api from "../api/api";

export function ItemSearch({ onAddItem }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (search.trim().length >= 2) {
        searchItems(search);
      } else {
        setItems([]);
      }
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [search]);

  async function searchItems(searchValue) {
    setError("");
    setLoading(true);

    try {
      const res = await api.get(
        `/tarkov/search?search=${encodeURIComponent(searchValue)}`,
      );

      setItems(res.data);
    } catch (error) {
      console.log("Search failed:", error);
      setError(error.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) return;

    searchItems(search);
  }

  return (
    <div className="item-search">
      <h2>Search for items</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search ULACH, ComTac, AK, Death Shadow..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}

      {error && <p className="auth-error">{error}</p>}

      {items.length > 0 && (
        <div className="search-results">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.iconLink} alt={item.name} />

              <div>
                <h3>{item.name}</h3>

                <p>
                  Price: ₽{" "}
                  {item.avg24hPrice || item.lastLowPrice || item.basePrice || 0}
                </p>

                <p>Weight: {item.weight || 0} kg</p>

                <button onClick={() => onAddItem(item)}>Add to loadout</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
