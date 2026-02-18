/*const Sub = require("../models/subPackagesModels");

exports.createSubPackages = async (req, res) => {
  const data = await Sub.create({
    ...req.body,
    mainImage: req.files.mainImage[0].path,
    galleryImages: req.files.galleryImages.map(f => f.path)
  });
  res.json(data);
};

exports.fetchAllSubPackages = async (req, res) => {
  res.json(await Sub.find());
};

exports.fetchSubPackages = async (req, res) => {
  res.json(await Sub.findById(req.params.id));
};

exports.updateSubPackages = async (req, res) => {
  res.json(await Sub.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteSubPackages = async (req, res) => {
  await Sub.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*//*

const Sub = require("../models/subPackagesModels");

/* =========================
   CREATE SUB PACKAGE
========================= *//*
exports.createSubPackages = async (req, res) => {
  try {
    const data = {
      ...req.body
    };

    // main image
    if (req.files?.mainImage?.length) {
      data.mainImage = req.files.mainImage[0].path;
    }

    // gallery images
    if (req.files?.galleryImages?.length) {
      data.galleryImages = req.files.galleryImages.map(
        (file) => file.path
      );
    }

    const created = await Sub.create(data);
    res.json(created);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create sub package",
      error: error.message
    });
  }
};

/* =========================
   GET ALL SUB PACKAGES
========================= *//*
exports.fetchAllSubPackages = async (req, res) => {
  res.json(await Sub.find());
};

/* =========================
   GET SINGLE SUB PACKAGE
========================= *//*
exports.fetchSubPackages = async (req, res) => {
  res.json(await Sub.findById(req.params.id));
};

/* =========================
   UPDATE SUB PACKAGE
========================= *//*
exports.updateSubPackages = async (req, res) => {
  try {
    const data = {
      ...req.body
    };

    // update main image if provided
    if (req.files?.mainImage?.length) {
      data.mainImage = req.files.mainImage[0].path;
    }

    // update gallery images if provided
    if (req.files?.galleryImages?.length) {
      data.galleryImages = req.files.galleryImages.map(
        (file) => file.path
      );
    }

    const updated = await Sub.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update sub package",
      error: error.message
    });
  }
};

/* =========================
   DELETE SUB PACKAGE
========================= *//*
exports.deleteSubPackages = async (req, res) => {
  await Sub.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/
/*
const Sub = require("../models/subPackagesModels");

/* CREATE *//*
exports.createSubPackages = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.mainImage = req.file.path.replace(/\\/g, "/");
    }

    const created = await Sub.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET ALL *//*
exports.fetchAllSubPackages = async (req, res) => {
  const subs = await Sub.find().sort({ createdAt: -1 });
  res.json(subs);
};

/* DELETE *//*
exports.deleteSubPackages = async (req, res) => {
  await Sub.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
*/
const Sub = require("../models/subPackagesModels");
const AllTour = require("../models/allToursModel");

/* GET ALL */
exports.fetchAllSubPackages = async (req, res) => {
  try {
    const subs = await Sub.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET BY ID */
exports.getSubPackageById = async (req, res) => {
  try {
    const sub = await Sub.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: "Not found" });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CREATE */
exports.createSubPackages = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.mainImage = `uploads/${req.file.filename}`;
    }

    const created = await Sub.create(data);

    // 🔥 ADD INTO ALL TOURS
    await AllTour.create({
      refId: created._id,
      title: created.title,
      location: created.location,
      price: created.price,
      mainImage: created.mainImage,
      type: "Sub"
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE */
exports.deleteSubPackages = async (req, res) => {
  await Sub.findByIdAndDelete(req.params.id);
  await AllTour.deleteOne({ refId: req.params.id, type: "Sub" });
  res.json({ message: "Deleted" });
};
