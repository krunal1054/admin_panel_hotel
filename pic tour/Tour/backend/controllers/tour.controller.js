/*const Tour = require("../models/Tour");

// GET ALL TOURS (with filters)
exports.getTours = async (req, res) => {
  try {
    const { location, price } = req.query;
    let filter = {};

    if (location) filter.location = location;
    if (price === "low") filter.price = { $lt: 30000 };
    if (price === "high") filter.price = { $gte: 30000 };

    const tours = await Tour.find(filter);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
*/
/*
const Tour = require("../models/Tour");

/* ===============================
   CREATE TOUR (ADMIN)
================================ *//*
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      mainImage: req.file ? req.file.path : ""
    });

    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create tour",
      error: err.message
    });
  }
};

/* ===============================
   GET ALL TOURS
================================ *//*
exports.getTours = async (req, res) => {
  try {
    const { location, price } = req.query;
    let filter = {};

    if (location) filter.location = location;
    if (price === "low") filter.price = { $lt: 30000 };
    if (price === "high") filter.price = { $gte: 30000 };

    const tours = await Tour.find(filter);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   GET TOUR BY ID
================================ *//*
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
*/
/*
const Tour = require("../models/Tour");

// CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      mainImage: req.file.path
    });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TOURS
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TOUR BY ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
/*
const Tour = require("../models/Tour");

// CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      // 🔥 FIX: backslash → slash
      mainImage: req.file.path.replace(/\\/g, "/"),
    });

    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL TOURS
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TOUR BY ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET ALL TOURS (with filter)
exports.getTours = async (req, res) => {
  try {
    const { tourType } = req.query;

    const filter = {};
    if (tourType && tourType !== "All") {
      filter.tourType = tourType;
    }

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
/*
const Tour = require("../models/Tour");

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.mainImage = req.file.path.replace(/\\/g, "/");
    }

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/

const Tour = require("../models/Tour");

/* CREATE TOUR */
exports.createTour = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.mainImage = req.file.path.replace(/\\/g, "/");
    }

    const tour = await Tour.create(data);
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ALL TOURS */
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET TOUR BY ID */
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE TOUR */
exports.updateTour = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.mainImage = req.file.path.replace(/\\/g, "/");
    }

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE TOUR */
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTours = async (req, res) => {
  try {
    const { tourType } = req.query;

    let filter = {};
    if (tourType && tourType !== "All") {
      filter.tourType = tourType;
    }

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
