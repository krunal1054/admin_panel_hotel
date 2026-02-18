const mongoose = require("mongoose");

const subPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    tourType: { type: String, required: true },

    mainImage: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubPackage", subPackageSchema);
