import React from "react";

export function LoadoutSummary({ items, onRemoveItem, onChangeQuantity }) {
  const totalCost = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalWeight = items.reduce((total, item) => {
    return total + item.weight * item.quantity;
  }, 0);

  function getKitTier(cost) {
    if (cost < 150000) return "Budget";
    if (cost < 400000) return "Mid-tier";
    if (cost < 800000) return "High-tier";
    return "GigaChad";
  }

  return (
    <div>
      <h2>Your Loadout</h2>

      {items.length === 0 && <p>No items selected.</p>}

      {items.map((item) => (
        <div className="item-card" key={item.loadoutID}>
          <img src={item.iconLink} alt={item.name} width="64" />
          <h3>{item.name}</h3>

          <p>Price each: ₽{item.price}</p>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onChangeQuantity(item.loadoutID, e.target.value)}
          />

          <p>Total: ₽{item.price * item.quantity}</p>

          <button onClick={() => onRemoveItem(item.loadoutID)}>Remove</button>
        </div>
      ))}

      <hr />

      <h2>Total Cost: ₽{totalCost}</h2>
      <h3>Total Weight: {totalWeight.toFixed(2)} kg</h3>
      <h3>Kit Tier: {getKitTier(totalCost)}</h3>
    </div>
  );
}
