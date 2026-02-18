const express = require("express");
const router = express.Router();
const {
  syncAllTours,
  getAllTours
} = require("../controllers/allToursController");

// 🔥 ONE TIME (or whenever data changes)
router.post("/sync", syncAllTours);

// 🔥 Frontend uses this
router.get("/", getAllTours);

module.exports = router;
