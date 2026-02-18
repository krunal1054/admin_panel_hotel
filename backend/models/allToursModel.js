const mongoose = require("mongoose");

const allToursSchema = new mongoose.Schema(
  {
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: String,
    location: String,
    price: Number,

    image: String,      // Top / Best
    mainImage: String,  // Sub

    type: {
      type: String, // Top | Best | Sub
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllTour", allToursSchema);
