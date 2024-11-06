import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/router/userRouter.js";
import morgan from "morgan";
import dotenv from "dotenv";

// Khởi tạo ứng dụng Express
const app = express();

// Đọc cổng từ biến môi trường hoặc sử dụng cổng mặc định 2000
const PORT = process.env.PORT || 2000;

dotenv.config();

// Middleware
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Các API route
app.use("/api", userRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
