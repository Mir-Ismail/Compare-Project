import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";
import Favorite from "./models/favorite.js";

// Load environment variables
dotenv.config();

const app = express();

// Database connection
connectDB();

// Create default admin user if not exists
(async () => {
  try {
    const adminEmail = "admin@example.com";
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        username: "admin",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
      });
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.error("Error creating default admin user:", err);
  }
})();

// Create sample data for testing
(async () => {
  try {
    // Check if sample data already exists
    const sampleUser = await User.findOne({ email: "user@example.com" });
    if (sampleUser) {
      console.log("Sample data already exists.");
      return;
    }

    // Create sample users
    const user1 = await User.create({
      username: "john_doe",
      email: "user@example.com",
      password: "user123",
      role: "user",
    });

    const vendor1 = await User.create({
      username: "tech_store",
      email: "vendor@example.com",
      password: "vendor123",
      role: "vendor",
    });

    const vendor2 = await User.create({
      username: "fashion_outlet",
      email: "fashion@example.com",
      password: "fashion123",
      role: "vendor",
    });

    // Create sample products
    const product1 = await Product.create({
      name: "iPhone 15 Pro",
      description: "Latest iPhone with advanced features",
      images: ["/images/iphone15.jpg"],
      price: 299999,
      quantity: 50,
      vendor: vendor1._id,
    });

    const product2 = await Product.create({
      name: "Nike Air Max",
      description: "Comfortable running shoes",
      images: ["/images/nike.jpg"],
      price: 38999,
      quantity: 100,
      vendor: vendor2._id,
    });

    const product3 = await Product.create({
      name: "MacBook Pro",
      description: "Professional laptop for developers",
      images: ["/images/macbook.jpg"],
      price: 599999,
      quantity: 25,
      vendor: vendor1._id,
    });

    // Create sample orders
    await Order.create({
      user: user1._id,
      vendor: vendor1._id,
      product: product1._id,
      quantity: 1,
      price: 299999,
    });

    await Order.create({
      user: user1._id,
      vendor: vendor2._id,
      product: product2._id,
      quantity: 2,
      price: 38999,
    });

    // Create sample favorites
    await Favorite.create({
      user: user1._id,
      product: product3._id,
    });

    console.log("Sample data created successfully.");
  } catch (err) {
    console.error("Error creating sample data:", err);
  }
})();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB: ${process.env.MONGO_URI}`);
  console.log(`CORS allowed origin: ${process.env.CLIENT_URL}`);
});
