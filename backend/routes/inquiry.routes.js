const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");


const {
  createInquiry,
  getAllInquiries
} = require("../controllers/inquiryController");

router.post("/", createInquiry);
router.get("/", getAllInquiries);

router.get("/", adminAuth, getAllInquiries);

module.exports = router;
