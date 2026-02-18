const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/sub-packages",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const uploadSubPackageImages = multer({ storage });

module.exports = { uploadSubPackageImages };
