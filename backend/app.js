// app.js
import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from './middlewares/errors.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
dotenv.config({ path: "backend/config/config.env" });

// Connect to database
connectDatabase();

//Convert Webhook String
app.use("/api/v1/payment/webhook", express.raw({ type: "application/json" }));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Import routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js';

// Use routes for different resources
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
    })
}

// Using error handling middleware
app.use(errorMiddleware);

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
