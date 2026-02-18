const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createBestPackages,
  fetchAllBestPackages,
  fetchBestPackages,
  updateBestPackages,
  deleteBestPackages
} = require("../controllers/bestPackagesControllers");

router.post("/", upload.single("image"), createBestPackages);
router.get("/", fetchAllBestPackages);
router.get("/:id", fetchBestPackages);
router.put("/:id", upload.single("image"), updateBestPackages);
router.delete("/:id", deleteBestPackages);

module.exports = router;
