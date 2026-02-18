const Inquiry = require("../models/inquiryModel");

exports.createInquiry = async (req, res) => {
  res.json(await Inquiry.create(req.body));
};

exports.getAllInquiries = async (req, res) => {
  res.json(await Inquiry.find());
};
