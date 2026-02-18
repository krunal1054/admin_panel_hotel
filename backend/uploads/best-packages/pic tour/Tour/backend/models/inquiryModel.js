const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    message: String,
    subPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subPackages"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
