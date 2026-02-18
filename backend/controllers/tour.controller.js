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
