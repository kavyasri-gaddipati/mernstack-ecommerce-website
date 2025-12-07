//gaddipatikavyasri:gaddipatikavyasri@cluster0.txfdj.mongodb.net/?appName=Cluster0/clothing-ecommerce

// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Correct way: Varaku .env nundi variable ni techukuntam
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;