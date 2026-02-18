const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createSubPackages,
  fetchAllSubPackages,
  deleteSubPackages,
  getSubPackageById   // 👈 ADD
} = require("../controllers/subPackagesControllers");

router.get("/", fetchAllSubPackages);
router.get("/:id", getSubPackageById); // 🔥 NEW
router.post("/", upload.single("mainImage"), createSubPackages);
router.delete("/:id", deleteSubPackages);

module.exports = router;
