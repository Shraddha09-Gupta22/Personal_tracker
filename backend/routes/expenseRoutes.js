import express from "express";
import {
  addExpense,
  getAllExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/allExpense", protect, getAllExpense);
router.post("/update/:id", protect, updateExpense);
router.delete("/delete/:id", protect, deleteExpense);

export default router;
