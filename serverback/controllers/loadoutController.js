const Loadout = require("../models/Loadout");

const createLoadout = async (req, res) => {
  try {
    const { name, items, totalCost, totalWeight } = req.body;

    const loadout = await Loadout.create({
      name,
      items,
      totalCost,
      totalWeight,
      user: req.user._id,
    });

    res.status(201).json(loadout);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to save loadout" });
  }
};

const deleteLoadout = async (req, res) => {
  try {
    const { id } = req.params;
    await Loadout.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });
    res.json({ message: "LOADOUT DELETED" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to delete the loadout" });
  }
};

const getLoadouts = async (req, res) => {
  try {
    console.log("GET /api/loadouts hit");

    const loadouts = await Loadout.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(loadouts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get loadouts" });
  }
};

const getLoadoutById = async (req, res) => {
  try {
    const { id } = req.params;

    const loadout = await Loadout.findOne({ _id: id, user: req.user._id });
    if (!loadout) {
      return res.status(404).json({ message: "Loadout not found" });
    }
    res.json(loadout);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to view the loadout" });
  }
};

module.exports = {
  createLoadout,
  getLoadouts,
  deleteLoadout,
  getLoadoutById,
};
