const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createLoadout,
  getLoadouts,
  getLoadoutById,
  deleteLoadout,
} = require("../controllers/loadoutController");

router.post("/", protect, createLoadout);
router.get("/", protect, getLoadouts);
router.get("/:id", protect, getLoadoutById);
router.delete("/:id", protect, deleteLoadout);

module.exports = router;
