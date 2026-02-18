/*const Top = require("../models/topPackagesModels");

exports.createTopPackages = async (req, res) => {
  res.json(await Top.create({ ...req.body, image: req.file.path }));
};

exports.fetchAllTopPackages = async (req, res) => {
  res.json(await Top.find());
};

exports.fetchTopPackageById = async (req, res) => {
  res.json(await Top.findById(req.params.id));
};

exports.updateTopPackages = async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    data.image = req.file.path;
  }

  const updated = await Top.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
};

exports.deleteTopPackages = async (req, res) => {
  await Top.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/
/*
const Top = require("../models/topPackagesModels");

/* =========================
   CREATE TOP PACKAGE
========================= *//*
exports.createTopPackages = async (req, res) => {
  try {
    const data = {
      ...req.body
    };

    if (req.file) {
      data.image = req.file.path;
    }

    const created = await Top.create(data);
    res.json(created);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create top package",
      error: error.message
    });
  }
};

/* =========================
   GET ALL TOP PACKAGES
========================= *//*
exports.fetchAllTopPackages = async (req, res) => {
  res.json(await Top.find());
};

/* =========================
   GET SINGLE TOP PACKAGE
========================= *//*
exports.fetchTopPackageById = async (req, res) => {
  res.json(await Top.findById(req.params.id));
};

/* =========================
   UPDATE TOP PACKAGE
========================= *//*
exports.updateTopPackages = async (req, res) => {
  try {
    const data = {
      ...req.body
    };

    if (req.file) {
      data.image = req.file.path;
    }

    const updated = await Top.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update top package",
      error: error.message
    });
  }
};

/* =========================
   DELETE TOP PACKAGE
========================= *//*
exports.deleteTopPackages = async (req, res) => {
  await Top.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/
/*
const TopPackage = require("../models/topPackagesModels");

/* CREATE *//*
exports.createTopPackages = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.path;

    const saved = await TopPackage.create(data);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL *//*
exports.fetchAllTopPackages = async (req, res) => {
  const packages = await TopPackage.find().sort({ createdAt: -1 });
  res.json(packages);
};

/* GET ONE *//*
exports.fetchTopPackageById = async (req, res) => {
  res.json(await TopPackage.findById(req.params.id));
};

/* UPDATE *//*
exports.updateTopPackages = async (req, res) => {
  const data = req.body;
  if (req.file) data.image = req.file.path;

  const updated = await TopPackage.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
};

/* DELETE *//*
exports.deleteTopPackages = async (req, res) => {
  await TopPackage.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/

const TopPackage = require("../models/topPackagesModels");
const AllTour = require("../models/allToursModel");

/* CREATE */
exports.createTopPackages = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.image = req.file.path;

    const saved = await TopPackage.create(data);

    // 🔥 ADD INTO ALL TOURS (NO DATA CHANGE)
    await AllTour.create({
      refId: saved._id,
      title: saved.title,
      location: saved.location || "",
      price: saved.price,
      image: saved.image,
      type: "Top"
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
exports.fetchAllTopPackages = async (req, res) => {
  const packages = await TopPackage.find().sort({ createdAt: -1 });
  res.json(packages);
};

/* GET ONE */
exports.fetchTopPackageById = async (req, res) => {
  res.json(await TopPackage.findById(req.params.id));
};

/* UPDATE */
exports.updateTopPackages = async (req, res) => {
  const data = req.body;
  if (req.file) data.image = req.file.path;

  const updated = await TopPackage.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json(updated);
};

/* DELETE */
exports.deleteTopPackages = async (req, res) => {
  await TopPackage.findByIdAndDelete(req.params.id);
  await AllTour.deleteOne({ refId: req.params.id, type: "Top" });
  res.json({ message: "Deleted" });
};
