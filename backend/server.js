import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.post("/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields.",
    });
  }
});

console.log(process.env.MONGO_URI);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
