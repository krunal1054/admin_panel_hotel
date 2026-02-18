const AllTour = require("../models/allToursModel");
const Top = require("../models/topPackagesModels");
const Best = require("../models/bestPackagesModels");
const Sub = require("../models/subPackagesModels");

/* ================= SYNC ALL TOURS ================= */
exports.syncAllTours = async (req, res) => {
  try {
    // 1️⃣ Clear old data
    await AllTour.deleteMany();

    // 2️⃣ Fetch all packages
    const top = await Top.find();
    const best = await Best.find();
    const sub = await Sub.find();

    // 3️⃣ Format into one structure
    const data = [
      ...top.map(t => ({
        refId: t._id,
        title: t.title,
        location: t.location || "",
        price: Number(t.price),
        image: t.image,
        type: "Top"
      })),

      ...best.map(t => ({
        refId: t._id,
        title: t.title,
        location: "",
        price: Number(t.price),
        image: t.image,
        type: "Best"
      })),

      ...sub.map(t => ({
        refId: t._id,
        title: t.title,
        location: t.location,
        price: Number(t.price),
        image: t.mainImage,
        type: "Sub"
      }))
    ];

    // 4️⃣ Insert into MongoDB
    await AllTour.insertMany(data);

    res.json({
      success: true,
      message: "All Tours synced successfully",
      count: data.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL TOURS ================= */
exports.getAllTours = async (req, res) => {
  try {
    const tours = await AllTour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
