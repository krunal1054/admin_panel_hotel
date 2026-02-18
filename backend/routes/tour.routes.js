const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour
} = require("../controllers/tour.controller");

/* ROUTES */
router.post("/", upload.single("mainImage"), createTour);
router.get("/", getTours);
router.get("/:id", getTourById);
router.put("/:id", upload.single("mainImage"), updateTour);
router.delete("/:id", deleteTour);

module.exports = router;
