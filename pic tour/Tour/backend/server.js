/*const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const tourRoutes = require("./routes/tour.routes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));
app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/tours", tourRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
*/
/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const tourRoutes = require("./routes/tour.routes");

dotenv.config();
connectDB();

const app = express();

/* =======================
   MIDDLEWARES
======================= *//*
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES (IMAGES)
   http://localhost:5000/uploads/....
======================= *//*
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/api/tours", require("./routes/tour.routes"));

/* =======================
   API ROUTES
======================= *//*
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));

app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/tours", tourRoutes);
app.use("/api/tours", require("./routes/tour.routes"));

/* =======================
   TEST ROUTE
======================= *//*
app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running Successfully");
});

/* =======================
   SERVER START
======================= *//*
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*//*

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

/* =======================
   LOAD ENV & CONNECT DB
======================= *//*
dotenv.config();
connectDB();

const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= *//*
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES (IMAGES)
   Example:
   http://localhost:5000/uploads/image.jpg
======================= *//*
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* =======================
   API ROUTES
======================= *//*
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));

app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));

/* ✅ TOUR ROUTES (ONLY ONCE) *//*
app.use("/api/tours", require("./routes/tour.routes"));

/* =======================
   TEST ROUTE
======================= *//*
app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running Successfully");
});

/* =======================
   START SERVER
======================= *//*
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/

/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const tourRoutes = require("./routes/tour.routes");

/* ===== MIDDLEWARE ===== *//*
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC FILES ===== */
/* http://localhost:5000/uploads/filename.jpg */
/*app.use("/uploads", express.static(path.join(__dirname, "uploads")));*//*
app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ===== ROUTES ===== *//*
app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));
app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/tours", tourRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));
app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* =======================
   LOAD ENV & CONNECT DB
======================= *//*
dotenv.config();

const connectDB = require("./config/db");
connectDB();

/* =======================
   CREATE APP
======================= *//*
const app = express();
const allToursRoutes = require("./routes/allToursRoutes");


/* =======================
   GLOBAL MIDDLEWARES
======================= *//*
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES (IMAGES)
======================= *//*
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= *//*
app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));
app.use("/api/booking", require("./routes/booking.routes"));
app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/all-tours", require("./routes/allToursRoutes"));

/* =======================
   ROOT CHECK
======================= *//*
app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running Successfully");
});

/* =======================
   GLOBAL ERROR HANDLER
======================= *//*
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =======================
   START SERVER
======================= *//*
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/
/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* =======================
   LOAD ENV & CONNECT DB
======================= *//*
dotenv.config();

const connectDB = require("./config/db");
connectDB();

/* =======================
   CREATE APP
======================= *//*
const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= *//*
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES (IMAGES)
======================= *//*
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= *//*
app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));

/* 🔥 BOOKING + BOOKING STATUS (SAME ROUTE FILE) *//*
app.use("/api/booking", require("./routes/booking.routes"));

app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/all-tours", require("./routes/allToursRoutes"));

/* =======================
   ROOT CHECK
======================= *//*
app.get("/", (req, res) => {
  res.send("🚀 Tour Backend Running Successfully");
});

/* =======================
   GLOBAL ERROR HANDLER
======================= *//*
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =======================
   START SERVER
======================= *//*
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
*/

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

/* =======================
   LOAD ENV & CONNECT DB
======================= */
dotenv.config();
const connectDB = require("./config/db");
connectDB();

/* =======================
   CREATE APP
======================= */
const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES
======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= */
app.use("/api/tours", require("./routes/tour.routes"));
app.use("/api/top-packages", require("./routes/topPackages.routes"));
app.use("/api/best-packages", require("./routes/bestPackages.routes"));
app.use("/api/sub-packages", require("./routes/subPackages.routes"));

/* 🔥 BOOKINGS */
app.use("/api/booking", require("./routes/booking.routes"));

/* 🔥 BOOKING STATUS (ADMIN TABLE) */
app.use("/api/bookingstatus", require("./routes/bookingStatus.routes"));

app.use("/api/inquiry", require("./routes/inquiry.routes"));
app.use("/api/search", require("./routes/search.routes"));
app.use("/api/users", require("./routes/Customer.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/all-tours", require("./routes/allToursRoutes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/admin/dashboard", require("./routes/dashboard.routes"));

/* =======================
   ROOT
======================= */
app.get("/", (req, res) => {
   res.send("🚀 Tour Backend Running Successfully");
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
   console.error("❌ ERROR:", err.message);
   res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
   });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
});
