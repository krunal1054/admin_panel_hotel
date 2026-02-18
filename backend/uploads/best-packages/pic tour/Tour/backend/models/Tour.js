/*const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type: String, required: true },

    // optional (future use)
    days: String,
    tourType: String,
    rating: String,
    discounts: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);*/

const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    mainImage: { type: String, required: true },

    days: String,
    tourType: String,
    rating: String,
    discounts: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
