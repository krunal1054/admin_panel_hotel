/*const mongoose = require("mongoose");

const subPackagesSchema = new mongoose.Schema(
  {
    bestPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packages",
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topPackages",
      required: true
    },
    title: { type: String, required: true },
    location: { type: String, required: true },
    tourType: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: String, required: true },
    days: { type: String, required: true },
    discounts: { type: String, required: true },
    mainImage: { type: String, required: true },
    galleryImages: [String],
    inclusions: [String],
    exclusions: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("subPackages", subPackagesSchema);
*/
/*
const mongoose = require("mongoose");

const subPackagesSchema = new mongoose.Schema(
  {
    /* =========================
       RELATIONS
    ========================= *//*
    bestPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bestPackages",
      required: true
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "topPackages",
      required: true
    },

    /* =========================
       BASIC INFO
    ========================= *//*
    title: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    tourType: {
      type: String,
      enum: ["Family", "Couple", "Adventure", "Group"],
      required: true
    },

    /* =========================
       TOUR DETAILS
    ========================= *//*
    price: {
      type: Number,
      required: true
    },

    days: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      default: 4.5
    },

    discount: {
      type: Number,
      default: 0
    },

    /* =========================
       IMAGES
    ========================= *//*
    mainImage: {
      type: String,
      required: true
    },

    galleryImages: {
      type: [String],
      default: []
    },

    /* =========================
       EXTRA INFO
    ========================= *//*
    inclusions: {
      type: [String],
      default: []
    },

    exclusions: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("subPackages", subPackagesSchema);
*/

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
