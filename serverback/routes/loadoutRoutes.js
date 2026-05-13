const express = require("express");
const router = express.Router();

const {
  createLoadout,
  getLoadouts,
  getLoadoutById,
  deleteLoadout,
} = require("../controllers/loadoutController");

router.post("/", createLoadout);
router.get("/", getLoadouts);
router.get("/:id", getLoadoutById);
router.delete("/:id", deleteLoadout);

module.exports = router;
