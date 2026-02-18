const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  registerUser,
  checkLogin,
  getAllUsers,
  deleteUser,
  getPaidUsers,
} = require("../controllers/customerControllers");

router.post("/register", registerUser);
router.post("/login", checkLogin);

/* NORMAL */
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

/* 🔥 ADMIN – PAID USERS */
router.get("/paid", adminAuth, getPaidUsers);

module.exports = router;
