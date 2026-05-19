import React, { useState } from "react";
import { ItemSearch } from "../components/ItemSearch";
import { LoadoutSummary } from "../components/LoadoutSummary";
import api from "../api/api";
import { GearLayout } from "../components/GearLayot";

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

export function LoadoutBuilder() {
  const [loadoutItems, setLoadoutItems] = useState([]);
  const [loadoutName, setLoadoutName] = useState("");

  function addItem(item) {
    const price = item.avg24hPrice || item.lastLowPrice || item.basePrice || 0;

    const newItem = {
      loadoutID: crypto.randomUUID(),
      id: item.id,
      name: item.name,
      shortName: item.shortName,
      iconLink: item.iconLink,
      price,
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

    try {
      const res = await api.post("/loadouts", loadout);

      console.log("Saved loadout:", res.data);
      alert("Loadout saved");

      setLoadoutName("");
      setLoadoutItems([]);
    } catch (error) {
      console.log("Failed to save loadout:", error);
      alert(error.response?.data?.message || "Failed to save loadout");
    }
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
              onChange={(e) => setLoadoutName(e.target.value)}
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
