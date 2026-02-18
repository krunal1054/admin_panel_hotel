/*const mongoose = require("mongoose");

const bestPackagesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    days: { type: String, required: true },
    tags: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Packages", bestPackagesSchema);
*/
const mongoose = require("mongoose");

const bestPackagesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    days: { type: String, required: true },
    tags: { type: String },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BestPackage", bestPackagesSchema);
