import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../services/api";
import jsPDF from "jspdf";

export default function Booking() {
  const { id } = useParams();
  const location = useLocation();

  /* ================= DETECT PACKAGE TYPE ================= */
  const packageType = location.pathname.includes("/sub/")
    ? "sub"
    : location.pathname.includes("/best/")
      ? "best"
      : "top";

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    travelType: "",
    persons: "",
    date: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  /* ================= LOAD PACKAGE ================= */
  useEffect(() => {
    const url =
      packageType === "top"
        ? `/top-packages/${id}`
        : packageType === "sub"
          ? `/sub-packages/${id}`
          : `/best-packages/${id}`;

    api
      .get(url)
      .then((res) => setPkg(res.data))
      .catch(() => setMessage("❌ Failed to load package"))
      .finally(() => setLoading(false));
  }, [id, packageType]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const required = [
      "name",
      "email",
      "phone",
      "gender",
      "travelType",
      "persons",
      "date",
    ];

    for (let f of required) {
      if (!form[f]) {
        setMessage("❌ Please fill all required fields");
        return false;
      }
    }

    if (paymentMethod === "card") {
      if (!form.cardNumber || !form.cardName || !form.expiry || !form.cvv) {
        setMessage("❌ Please fill all card details");
        return false;
      }
    }

    return true;
  };
  const generatePDF = () => {
    const pdf = new jsPDF();

    // ===== BACKGROUND =====
    pdf.setFillColor(245, 247, 250);
    pdf.rect(0, 0, 210, 297, "F");

    // ===== HEADER =====
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, 210, 35, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text("TRAVEL BOOKING INVOICE", 105, 22, { align: "center" });

    // ===== SECTION BOX =====
    pdf.setFillColor(255, 255, 255);
    pdf.rect(10, 45, 190, 210, "F");

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text("Customer Details", 15, 60);

    pdf.setFontSize(11);

    // ===== CUSTOMER INFO =====
    let y = 70;
    const gap = 8;

    const customer = [
      ["Name", form.name],
      ["Email", form.email],
      ["Phone", form.phone],
      ["Gender", form.gender],
      ["Travel Type", form.travelType],
      ["Persons", form.persons],
      ["Travel Date", form.date],
    ];

    customer.forEach(([label, value]) => {
      pdf.text(label, 20, y);
      pdf.text(":", 70, y);
      pdf.text(String(value), 75, y);
      y += gap;
    });

    // ===== DIVIDER =====
    pdf.setDrawColor(200);
    pdf.line(15, y + 2, 195, y + 2);

    // ===== PACKAGE DETAILS =====
    y += 12;
    pdf.setFontSize(14);
    pdf.text("Package Details", 15, y);

    pdf.setFontSize(11);
    y += 10;

    const pkgDetails = [
      ["Package Type", packageType.toUpperCase()],
      ["Package Name", pkg.title],
      ["Location", pkg.location || "India"],
      ["Amount Paid", `₹${pkg.price}`],
      ["Payment Method", paymentMethod.toUpperCase()],
      ["Payment Status", "PAID"],
    ];

    pkgDetails.forEach(([label, value]) => {
      pdf.text(label, 20, y);
      pdf.text(":", 70, y);
      pdf.text(String(value), 75, y);
      y += gap;
    });

    // ===== FOOTER =====
    pdf.setFontSize(10);
    pdf.setTextColor(80);
    pdf.text(
      "Thank you for booking with us. Wishing you a happy and safe journey!",
      105,
      270,
      { align: "center" }
    );

    pdf.text(
      "This is a system generated invoice.",
      105,
      278,
      { align: "center" }
    );

    pdf.save("Travel-Booking-Invoice.pdf");
  };
  const handleBooking = async () => {
    if (!validateForm()) return;

    try {
      setMessage("Processing payment...");

      // 1️⃣ Create booking
      const res = await api.post("/booking", {
        packageType,
        packageId: id,
        userInfo: form,
        paymentMethod,
        pricing: { totalAmount: pkg.price },
      });

      const bookingId = res.data._id;

      // 2️⃣ 🔥 UPDATE BOOKING STATUS (IMPORTANT LINE)
      await api.post(`/bookingstatus/status/${bookingId}`, {
        bookingStatus: "upcoming",
        paymentStatus: "paid",
      });

      // 3️⃣ Generate PDF
      generatePDF();

      setMessage("✅ Booking successful! Invoice downloaded.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Booking failed. Please try again.");
    }
  };


  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!pkg) return <p className="text-center mt-20">Package not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 grid md:grid-cols-2 gap-8">
      {/* ================= PACKAGE DETAILS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <img
          src={`http://localhost:5000/${packageType === "sub" ? pkg.mainImage : pkg.image
            }`}
          className="w-full h-60 object-cover rounded-lg mb-4"
          alt={pkg.title}
        />

        <h2 className="text-2xl font-bold">{pkg.title}</h2>
        <p className="text-gray-500">📍 {pkg.location || "India"}</p>

        <p className="text-green-600 text-3xl font-semibold mt-4">
          ₹{pkg.price}
        </p>

        {pkg.tourType && (
          <span className="inline-block mt-3 px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            {pkg.tourType}
          </span>
        )}
      </div>

      {/* ================= BOOKING FORM ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Traveller Details</h2>

        <input className="input" name="name" placeholder="Full Name *" onChange={handleChange} />
        <input className="input" name="email" placeholder="Email *" onChange={handleChange} />
        <input className="input" name="phone" placeholder="Phone *" onChange={handleChange} />

        <select className="input" name="gender" onChange={handleChange}>
          <option value="">Gender *</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select className="input" name="travelType" onChange={handleChange}>
          <option value="">Travel Type *</option>
          <option value="Solo">Solo</option>
          <option value="Couple">Couple</option>
          <option value="Family">Family</option>
        </select>

        <input
          className="input"
          type="number"
          min="1"
          name="persons"
          placeholder="Number of Persons *"
          onChange={handleChange}
        />

        <input
          className="input"
          type="date"
          name="date"
          onChange={handleChange}
        />

        {/* ================= PAYMENT ================= */}
        <h3 className="font-semibold mt-6 mb-2">Payment Method *</h3>

        <label className="block">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />{" "}
          💳 Card
        </label>

        <label className="block">
          <input
            type="radio"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />{" "}
          🌐 Online
        </label>

        <label className="block">
          <input
            type="radio"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />{" "}
          💵 Cash
        </label>

        {paymentMethod === "card" && (
          <div className="mt-3">
            <input className="input" name="cardNumber" placeholder="Card Number *" onChange={handleChange} />
            <input className="input" name="cardName" placeholder="Card Holder Name *" onChange={handleChange} />
            <div className="grid grid-cols-2 gap-2">
              <input className="input" name="expiry" placeholder="MM/YY *" onChange={handleChange} />
              <input className="input" name="cvv" placeholder="CVV *" onChange={handleChange} />
            </div>
          </div>
        )}

        <button
          onClick={handleBooking}
          className="w-full bg-black text-white py-4 rounded-xl mt-6 text-lg"
        >
          Pay ₹{pkg.price}
        </button>

        {message && (
          <p className="text-center mt-4 text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
}
