/*const mongoose = require("mongoose");

const topPackagesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    placecountes: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("topPackages", topPackagesSchema);
*/
const mongoose = require("mongoose");

const topPackagesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    placeCount: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopPackage", topPackagesSchema);
