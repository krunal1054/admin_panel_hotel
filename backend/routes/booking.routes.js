const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  createBooking,
  getMyBookings,
  markPaymentComplete,
  cancelBooking,
  markCompleted
} = require("../controllers/bookingController");

/* USER */
router.post("/", createBooking);
router.get("/user/:userId", getMyBookings);

/* ADMIN ACTIONS */
router.put("/pay/:bookingId", markPaymentComplete);
router.put("/cancel/:bookingId", cancelBooking);
router.put("/complete/:bookingId", markCompleted);


router.put("/pay/:bookingId", adminAuth, markPaymentComplete);
router.put("/cancel/:bookingId", adminAuth, cancelBooking);
router.put("/complete/:bookingId", adminAuth, markCompleted);

module.exports = router;
