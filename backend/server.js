const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

// Database Connection
connectDB();

const app = express();

// --- 1. CORS CONFIGURATION (TOP LO UNDALI) ---
// Idi first unte ne Browser Requests Accept chestundi
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local Testing
      "https://pasovit-store.vercel.app", // LIVE Vercel Link
    ],
    credentials: true, // Login Cookie work avvadaniki
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS mukhyam
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// --- 2. MIGITHA MIDDLEWARE (DIN TARVATA) ---
app.use(express.json());
app.use(cookieParser());

// --- ROUTES ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
