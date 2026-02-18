const Packages = require("../models/bestPackagesModels");
const AllTour = require("../models/allToursModel");

/* CREATE */
exports.createBestPackages = async (req, res) => {
  try {
    const saved = await Packages.create({
      ...req.body,
      image: req.file.path.replace(/\\/g, "/")
    });

    // 🔥 ADD INTO ALL TOURS
    await AllTour.create({
      refId: saved._id,
      title: saved.title,
      price: saved.price,
      image: saved.image,
      type: "Best"
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL */
exports.fetchAllBestPackages = async (req, res) => {
  const data = await Packages.find().sort({ createdAt: -1 });
  res.json(data);
};

/* GET ONE */
exports.fetchBestPackages = async (req, res) => {
  const data = await Packages.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json(data);
};

/* UPDATE */
exports.updateBestPackages = async (req, res) => {
  const updated = await Packages.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      ...(req.file && { image: req.file.path.replace(/\\/g, "/") })
    },
    { new: true }
  );
  res.json(updated);
};

/* DELETE */
exports.deleteBestPackages = async (req, res) => {
  await Packages.findByIdAndDelete(req.params.id);
  await AllTour.deleteOne({ refId: req.params.id, type: "Best" });
  res.json({ message: "Deleted" });
};
