const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();

// --- 🛑 MANUAL CORS FIX (The Nuclear Option) ---
// Idi kachitamga work avtundi because maname force ga headers pedtunnam
app.use((req, res, next) => {
  // Mee Vercel URL ikkada pettandi (Slash lekunda)
  const allowedOrigin = "https://pasovit-store.vercel.app";

  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true"); // Login kosam Chala Important

  // Browser 'OPTIONS' request pampithe, ventane OK cheppu
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());

// --- Routes ---
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// --- Error Handler ---
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
