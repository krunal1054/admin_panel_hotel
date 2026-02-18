const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
} = require("../controllers/admin.controller");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

/* 🔥 USERS LIST */
router.get("/users", adminAuth, getAllAdmins);

module.exports = router;
