import React, { useEffect, useState } from "react";
// import axios from "axios";
import api from "../api/api";
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
      const res = await api.get(`/loadouts/${id}`);
      setLoadout(res.data);
    } catch (error) {
      console.log("Failed to get loadout:", error);
    }
  }

  function getGearSlot(item) {
    const name = item.name?.toLowerCase() || "";
    const shortName = item.shortName?.toLowerCase() || "";
    const types = (item.types || []).map((type) => type.toLowerCase());

    const allText = `${name} ${shortName} ${types.join(" ")}`;

    if (
      allText.includes("headphones") ||
      allText.includes("headset") ||
      allText.includes("earpiece") ||
      allText.includes("comtac") ||
      allText.includes("sordin") ||
      allText.includes("razor") ||
      allText.includes("m32") ||
      allText.includes("gssh") ||
      allText.includes("xcel")
    ) {
      return "earpiece";
    }

    if (
      allText.includes("face cover") ||
      allText.includes("facecover") ||
      allText.includes("mask") ||
      allText.includes("balaclava") ||
      allText.includes("death shadow") ||
      allText.includes("ghost balaclava") ||
      allText.includes("shroud") ||
      allText.includes("momex")
    ) {
      return "facecover";
    }

    if (
      allText.includes("eyewear") ||
      allText.includes("glasses") ||
      allText.includes("goggles") ||
      allText.includes("condor") ||
      allText.includes("crossbow") ||
      allText.includes("raybench")
    ) {
      return "eyewear";
    }

    if (
      allText.includes("helmet") ||
      allText.includes("headwear") ||
      allText.includes("cap") ||
      allText.includes("hat") ||
      allText.includes("ulach") ||
      allText.includes("altyn") ||
      allText.includes("fast mt") ||
      allText.includes("tc-200")
    ) {
      return "headwear";
    }

    if (
      allText.includes("body armor") ||
      allText.includes("armor vest") ||
      allText.includes("bodyarmor") ||
      allText.includes("slick") ||
      allText.includes("hexgrid") ||
      allText.includes("korund") ||
      allText.includes("trooper")
    ) {
      return "bodyarmor";
    }

    if (allText.includes("backpack")) {
      return "misc";
    }

    if (
      allText.includes("gun") ||
      allText.includes("weapon") ||
      allText.includes("assault-rifle") ||
      allText.includes("assault rifle") ||
      allText.includes("rifle") ||
      allText.includes("carbine") ||
      allText.includes("smg") ||
      allText.includes("shotgun") ||
      allText.includes("marksman rifle") ||
      allText.includes("m4") ||
      allText.includes("ak-") ||
      allText.includes("rd-704") ||
      allText.includes("sa-58")
    ) {
      return "sling";
    }

    if (
      allText.includes("knife") ||
      allText.includes("melee") ||
      allText.includes("bayonet") ||
      allText.includes("hatchet")
    ) {
      return "sheath";
    }

    if (
      allText.includes("pistol") ||
      allText.includes("handgun") ||
      allText.includes("glock") ||
      allText.includes("m9a3") ||
      allText.includes("grach")
    ) {
      return "holster";
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
