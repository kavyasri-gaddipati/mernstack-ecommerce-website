// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

// --- 1. ROUTE FILES IMPORT ---
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes"); // Kothaga add chesam (Cart)

dotenv.config();
connectDB(); // Database Connect

const app = express();

// --- 2. MIDDLEWARE ---
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

// --- 3. ROUTES SETUP ---
app.use("/api/auth", authRoutes); // Login/Register
app.use("/api/products", productRoutes); // Products
app.use("/api/cart", cartRoutes); // Cart Logic (NEW)
app.use("/api/orders", orderRoutes);
// Basic Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
