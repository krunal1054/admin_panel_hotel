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
