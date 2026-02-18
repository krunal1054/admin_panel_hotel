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
