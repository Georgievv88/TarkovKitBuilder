import React, { useState } from "react";
import { ItemSearch } from "../components/ItemSearch";
import { LoadoutSummary } from "../components/LoadoutSummary";
// import axios from "axios";
import api from "../api/api";
import { GearLayout } from "../components/GearLayot";

export function LoadoutBuilder() {
  const [loadoutItems, setLoadoutItems] = useState([]);
  const [loadoutName, setLoadoutName] = useState("");

  function getGearSlot(item) {
    const name = item.name?.toLowerCase() || "";
    const types = (item.types || []).map((type) => type.toLowerCase());

    // WEAPONS FIRST
    if (
      types.includes("gun") ||
      types.includes("weapon") ||
      types.includes("assault-rifle") ||
      types.includes("assault rifle") ||
      types.includes("rifle") ||
      types.includes("carbine") ||
      types.includes("assault carbine") ||
      types.includes("marksman rifle") ||
      types.includes("smg") ||
      name.includes("m4") ||
      name.includes("space trooper") ||
      name.includes("ak-") ||
      name.includes("rifle") ||
      name.includes("carbine")
    ) {
      return "weapon";
    }

    // HELMET
    if (types.includes("helmet") || name.includes("helmet")) {
      return "helmet";
    }

    // RIG
    if (
      types.includes("rig") ||
      types.includes("chest-rig") ||
      types.includes("chest rig") ||
      name.includes("chest rig") ||
      name.includes("tactical rig")
    ) {
      return "rig";
    }

    // ARMOR
    if (
      types.includes("armor") ||
      name.includes("body armor") ||
      name.includes("armor vest") ||
      name.includes("slick") ||
      name.includes("hexgrid")
    ) {
      return "armor";
    }

    // BACKPACK
    if (types.includes("backpack") || name.includes("backpack")) {
      return "backpack";
    }

    return "misc";
  }

  function addItem(item) {
    const price = item.avg24hPrice || item.lastLowPrice || item.basePrice || 0;

    const newItem = {
      loadoutID: crypto.randomUUID(),
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      iconLink: item.iconLink,
      price: price,
      weight: item.weight || 0,
      quantity: 1,
      types: item.types,
      slot: getGearSlot(item),
    };

    setLoadoutItems([...loadoutItems, newItem]);
  }

  function removeItem(loadoutID) {
    setLoadoutItems(
      loadoutItems.filter((item) => item.loadoutID !== loadoutID),
    );
  }

  function changeQuantity(loadoutID, quantity) {
    setLoadoutItems(
      loadoutItems.map((item) =>
        item.loadoutID === loadoutID
          ? { ...item, quantity: Number(quantity) }
          : item,
      ),
    );
  }

  async function saveLoadout() {
    if (!loadoutName.trim()) {
      alert("Please enter a loadout name");
      return;
    }

    if (loadoutItems.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const totalCost = loadoutItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const totalWeight = loadoutItems.reduce((total, item) => {
      return total + item.weight * item.quantity;
    }, 0);

    const loadout = {
      name: loadoutName,
      items: loadoutItems.map((item) => ({
        tarkovItemId: item.id,
        name: item.name,
        shortName: item.shortName,
        iconLink: item.iconLink,
        price: item.price,
        weight: item.weight,
        quantity: item.quantity,
        types: item.types,
        slot: item.slot,
      })),
      totalCost,
      totalWeight,
    };

    const res = await api.post("/loadouts", loadout);

    console.log("Saved loadout:", res.data);
    alert("Loadout saved");
  }

  return (
    <div id="loadout-builder">
      <h1>Loadout Builder</h1>

      <div className="builder-layout">
        <div className="builder-left">
          <div>
            <label>Loadout Name</label>
            <input
              type="text"
              placeholder="Your Loadout"
              value={loadoutName}
              onChange={(e) => {
                setLoadoutName(e.target.value);
              }}
            />
          </div>

          <ItemSearch onAddItem={addItem} />

          <LoadoutSummary
            items={loadoutItems}
            onRemoveItem={removeItem}
            onChangeQuantity={changeQuantity}
          />

          <button onClick={saveLoadout}>Save Loadout</button>
        </div>

        <div className="builder-right">
          <GearLayout items={loadoutItems} />
        </div>
      </div>
    </div>
  );
}
