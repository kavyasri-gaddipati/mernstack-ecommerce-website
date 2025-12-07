// backend/seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// --- IMAGE LINKS (High Quality Unsplash Images) ---
const images = {
  Men: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    "https://images.unsplash.com/photo-1626557981101-aae6f84aa6cd?w=500&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    "https://images.unsplash.com/photo-1620012253295-c15cc3fe5d3d?w=500&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80"
  ],
  Women: [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    "https://images.unsplash.com/photo-1583391733958-37c7689fc78c?w=500&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80"
  ],
  Kids: [
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&q=80",
    "https://images.unsplash.com/photo-1519238263496-65260f3d2a43?w=500&q=80",
    "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80",
    "https://images.unsplash.com/photo-1619864205513-98895029c693?w=500&q=80",
    "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80"
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&q=80",
    "https://images.unsplash.com/photo-1565261071-c03845c4342a?w=500&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80"
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Headphone
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", // Watch
    "https://images.unsplash.com/photo-1588872657578-a3d89195280c?w=500&q=80", // Laptop
    "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?w=500&q=80", // Mobile
    "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=500&q=80"  // Speaker
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80", // Makeup
    "https://images.unsplash.com/photo-1612817288484-9691c9567225?w=500&q=80", // Cream
    "https://images.unsplash.com/photo-1571781926291-28b463122209?w=500&q=80", // Perfume
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80"  // Lipstick
  ]
};

// --- HELPER ARRAYS TO GENERATE NAMES ---
const adjectives = ["Premium", "Classic", "Modern", "Stylish", "Comfortable", "Luxury", "Casual", "Vintage", "Urban", "Sporty"];
const colors = ["Red", "Blue", "Black", "White", "Green", "Yellow", "Navy", "Beige", "Pink", "Grey"];
const materials = ["Cotton", "Silk", "Denim", "Leather", "Polyester", "Wool"];

// Function to get random item from array
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- PRODUCT GENERATOR ---
const generateProducts = () => {
  let products = [];

  // 1. Generate Men's Products (25 Items)
  const menTypes = ["T-Shirt", "Shirt", "Jeans", "Jacket", "Blazer", "Shorts", "Trousers"];
  for (let i = 0; i < 25; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(colors)} ${rand(menTypes)}`,
      description: `A ${rand(adjectives).toLowerCase()} ${rand(colors).toLowerCase()} item made of ${rand(materials)}. Perfect for daily wear.`,
      price: randInt(499, 4999),
      category: "Men",
      stock: randInt(10, 100),
      sizes: ["S", "M", "L", "XL", "XXL"],
      image: rand(images.Men)
    });
  }

  // 2. Generate Women's Products (25 Items)
  const womenTypes = ["Dress", "Top", "Skirt", "Saree", "Kurti", "Jeans", "Heels", "Gown"];
  for (let i = 0; i < 25; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(colors)} ${rand(womenTypes)}`,
      description: `Elegant ${rand(colors).toLowerCase()} ${rand(womenTypes).toLowerCase()}. Made with high quality ${rand(materials)}.`,
      price: randInt(599, 6999),
      category: "Women",
      stock: randInt(10, 100),
      sizes: ["S", "M", "L", "XL"],
      image: rand(images.Women)
    });
  }

  // 3. Generate Kids Products (15 Items)
  const kidsTypes = ["Tee", "Shorts", "Frock", "Jacket", "Onesie"];
  for (let i = 0; i < 15; i++) {
    products.push({
      name: `Kids ${rand(colors)} ${rand(kidsTypes)}`,
      description: `Comfortable and soft ${rand(kidsTypes).toLowerCase()} for kids.`,
      price: randInt(299, 1499),
      category: "Kids",
      stock: randInt(20, 80),
      sizes: ["2Y", "4Y", "6Y", "8Y"],
      image: rand(images.Kids)
    });
  }

  // 4. Generate Shoes (15 Items)
  const shoeTypes = ["Sneakers", "Running Shoes", "Loafers", "Boots", "Formal Shoes"];
  for (let i = 0; i < 15; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(shoeTypes)}`,
      description: `Durable and stylish ${rand(shoeTypes).toLowerCase()}.`,
      price: randInt(999, 4999),
      category: "Shoes",
      stock: randInt(10, 50),
      sizes: ["7", "8", "9", "10", "11"],
      image: rand(images.Shoes)
    });
  }

  // 5. Generate Accessories (10 Items)
  const accTypes = ["Watch", "Sunglasses", "Bag", "Wallet", "Belt", "Cap"];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(accTypes)}`,
      description: `Premium quality ${rand(accTypes).toLowerCase()}.`,
      price: randInt(499, 9999),
      category: "Accessories",
      stock: randInt(10, 100),
      sizes: ["Standard"],
      image: rand(images.Accessories)
    });
  }

  // 6. Generate Electronics (10 Items - NEW)
  const elecTypes = ["Headphones", "Bluetooth Speaker", "Smart Watch", "Power Bank"];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(elecTypes)}`,
      description: `High performance ${rand(elecTypes).toLowerCase()} with latest features.`,
      price: randInt(999, 14999),
      category: "Electronics",
      stock: randInt(5, 50),
      sizes: ["Standard"],
      image: rand(images.Electronics)
    });
  }

  // 7. Generate Beauty (10 Items - NEW)
  const beautyTypes = ["Perfume", "Lipstick", "Face Cream", "Makeup Kit"];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: `${rand(adjectives)} ${rand(beautyTypes)}`,
      description: `Long lasting ${rand(beautyTypes).toLowerCase()}. Skin friendly.`,
      price: randInt(299, 3999),
      category: "Beauty",
      stock: randInt(20, 100),
      sizes: ["Standard"],
      image: rand(images.Beauty)
    });
  }

  return products;
};

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear old data
    const seedData = generateProducts(); // Generate new data
    await Product.insertMany(seedData);
    
    console.log(`Success! Inserted ${seedData.length} Products! 🚀 Shop is now a MEGA STORE.`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();