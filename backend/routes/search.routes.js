const express = require("express");
const router = express.Router();
const { searchTours } = require("../controllers/searchTourControllers");

router.get("/", searchTours);

module.exports = router;
