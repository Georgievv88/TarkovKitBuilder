import React from "react";

export function GearLayout({ items }) {
  const weapons = items.filter((item) => item.slot === "sling");

  const primaryWeapon = weapons[0];
  const secondaryWeapon = weapons[1];

  function getFirstItemBySlot(slot) {
    return items.find((item) => item.slot === slot);
  }

  function SlotBox({ item, className }) {
    return (
      <div className={`tarkov-slot ${className}`}>
        {item && (
          <div className="tarkov-slot-item">
            <img src={item.iconLink} alt={item.name} />
            <span>{item.shortName || item.name}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="gear-layout">
      <h2>Gear Layout</h2>

      <div className="tarkov-layout-image">
        <SlotBox
          item={getFirstItemBySlot("earpiece")}
          className="slot-earpiece"
        />

        <SlotBox
          item={getFirstItemBySlot("headwear")}
          className="slot-headwear"
        />

        <SlotBox
          item={getFirstItemBySlot("facecover")}
          className="slot-facecover"
        />

        <SlotBox
          item={getFirstItemBySlot("bodyarmor")}
          className="slot-bodyarmor"
        />

        <SlotBox
          item={getFirstItemBySlot("eyewear")}
          className="slot-eyewear"
        />

        <SlotBox item={primaryWeapon} className="slot-sling" />

        <SlotBox item={secondaryWeapon} className="slot-backpack" />

        <SlotBox
          item={getFirstItemBySlot("holster")}
          className="slot-holster"
        />

        <SlotBox item={getFirstItemBySlot("sheath")} className="slot-sheath" />
      </div>
    </div>
  );
}
