const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://admin-hotel-frontend.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ================= ROUTES ================= */

app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));

app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/bookingstatus", require("./routes/bookingStatus.routes"));

app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));

/* IMPORTANT: filename check karo */
app.use("/api/users", require("./routes/Customer.routes"));

app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/all-tours", require("./routes/allToursRoutes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use(
  "/api/admin/dashboard",
  require("./routes/dashboard.routes")
);

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running Successfully");
});

/* ================= ERROR ================= */

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
