import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from './middlewares/errors.js'

const app = express();
dotenv.config({ path: "backend/config/config.env" })

// Connect to database
connectDatabase();
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// Import all routes
import productRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/order.js'

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);

// Using Error Middleware
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
});