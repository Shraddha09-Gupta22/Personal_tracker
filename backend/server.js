import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("DB connect");
  })
  .catch((err) => console.log("Error in connecting db."));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
