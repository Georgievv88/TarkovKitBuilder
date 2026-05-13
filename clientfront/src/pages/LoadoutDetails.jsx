import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { GearLayout } from "../components/GearLayot";

export function LoadoutDetails() {
  const { id } = useParams();
  const [loadout, setLoadout] = useState(null);

  useEffect(() => {
    getLoadout();
  }, [id]);

  async function getLoadout() {
    try {
      const res = await axios.get(`http://localhost:5000/api/loadouts/${id}`);
      setLoadout(res.data);
    } catch (error) {
      console.log("Failed to get loadout:", error);
    }
  }

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

  if (!loadout) {
    return <p>Loading...</p>;
  }

  const detailsItems = loadout.items.map((item) => ({
    ...item,
    loadoutID: item._id,
    slot: item.slot || getGearSlot(item),
  }));

  return (
    <div id="saved-loadouts">
      <Link to="/loadouts">Back to Saved Loadouts</Link>

      <h1>{loadout.name}</h1>

      <h3>Total Cost: ₽{loadout.totalCost}</h3>
      <h3>Total Weight: {loadout.totalWeight?.toFixed(2)} kg</h3>

      <GearLayout items={detailsItems} />

      <h2>Items</h2>

      {loadout.items.map((item) => (
        <div className="item-card" key={item._id}>
          <img src={item.iconLink} alt={item.name} width="64" />

          <h3>{item.name}</h3>

          <p>Short Name: {item.shortName}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price Each: ₽{item.price}</p>
          <p>Total: ₽{item.price * item.quantity}</p>
          <p>Weight: {item.weight} kg</p>
        </div>
      ))}
    </div>
  );
}
