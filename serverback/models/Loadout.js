const mongoose = require("mongoose");

const loadoutItemSchema = new mongoose.Schema({
  tarkovItemId: String,
  name: String,
  shortName: String,
  iconLink: String,
  price: Number,
  weight: Number,
  quantity: Number,
  types: [String],
  slot: String,
});

const loadoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [loadoutItemSchema],
  totalCost: Number,
  totalWeight: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Loadout", loadoutSchema);
