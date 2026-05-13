////Test za Slikata

import React from "react";

export function GearLayout({ items }) {
  function getItemsBySlot(slot) {
    return items.filter((item) => item.slot === slot);
  }

  function SlotBox({ slot, className }) {
    const slotItems = getItemsBySlot(slot);

    return (
      <div className={`tarkov-slot ${className}`}>
        {slotItems.map((item) => (
          <div key={item.loadoutID} className="tarkov-slot-item">
            <img src={item.iconLink} alt={item.name} />
            <span>{item.shortName || item.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="gear-layout">
      <h2>Gear Layout</h2>

      <div className="tarkov-layout-image">
        <SlotBox slot="headset" className="slot-earpiece" />
        <SlotBox slot="helmet" className="slot-headwear" />
        <SlotBox slot="facecover" className="slot-facecover" />
        <SlotBox slot="armor" className="slot-bodyarmor" />
        <SlotBox slot="eyewear" className="slot-eyewear" />
        <SlotBox slot="weapon" className="slot-sling" />
        <SlotBox slot="backpack" className="slot-backpack" />
        <SlotBox slot="holster" className="slot-holster" />
        <SlotBox slot="melee" className="slot-sheath" />
      </div>
    </div>
  );
}
