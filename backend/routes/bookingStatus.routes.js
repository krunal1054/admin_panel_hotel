const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
    getPaidUsers,
} = require("../controllers/bookingstatusController");

/* USER */
router.post("/", createBooking);

/* ADMIN */
router.get("/", adminAuth, getAllBookings);
router.post("/status/:bookingId", adminAuth, updateBookingStatus);

router.get("/paid-users", adminAuth, getPaidUsers);

module.exports = router;
