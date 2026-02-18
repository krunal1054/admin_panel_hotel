const express = require("express");
const router = express.Router(); // ✅ MUST be FIRST

const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/topPackageUpload");

const {
  createTopPackages,
  fetchAllTopPackages,
  fetchTopPackageById,
  updateTopPackages,
  deleteTopPackages,
} = require("../controllers/topPackageController"); // ✅ EXACT NAME

router.get("/", fetchAllTopPackages);
router.get("/:id", fetchTopPackageById);

router.post("/", adminAuth, upload.single("image"), createTopPackages);
router.put("/:id", adminAuth, upload.single("image"), updateTopPackages);
router.delete("/:id", adminAuth, deleteTopPackages);

module.exports = router;
