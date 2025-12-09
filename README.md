# Pasovit Clothings - Premium E-commerce App

A modern, fully functional E-commerce application built using the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a premium UI, secure authentication, a complete shopping cart system, and automated email notifications.

---

## ✨ Features

 User Authentication:** Secure Sign Up & Login using JWT & HttpOnly Cookies.
 Massive Product Catalog:** 100+ Products across categories (Men, Women, Kids, Electronics, Beauty).
 Smart Shopping Cart:** Add to cart, adjust quantity, and real-time total calculation.
 Checkout System:** Professional checkout flow with Mock Payment Integration (Card, UPI, COD).
 Email Notifications:** Automated "Order Confirmation" emails sent via Nodemailer.
 Modern UI/UX:** Glassmorphism design, smooth animations, and responsive layout.
Search & Filters:** Filter products by category (Electronics, Fashion, etc.).

---

##  Tech Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend** | React.js, Vite, Context API, CSS3 (Custom Premium Styles) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Cloud Database) |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js |
| **Email Service** | Nodemailer (Gmail SMTP) |

---

## 📂 Project Structure

```bash
clothing-ecommerce/
├── backend/            # API Server & Database Logic
│   ├── config/         # MongoDB Connection
│   ├── controllers/    # Route Logic (Auth, Products, Orders)
│   ├── models/         # Database Schemas
│   ├── routes/         # API Endpoints
│   ├── utils/          # Helper functions (Email, Tokens)
│   ├── seedProducts.js # Script to fill database with 100+ items
│   └── server.js       # Main Server Entry Point
│
├── frontend/           # React User Interface
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, Footer, Cards)
│   │   ├── context/    # State Management (Auth, Cart)
│   │   ├── pages/      # Main Pages (Home, Cart, Checkout)
│   │   └── services/   # Axios API Configuration


