import express from "express";
import {
  addBudget,
  getAllBudget,
  getBudget,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/add", protect, addBudget);
router.get("/allBudget", protect, getAllBudget);
router.get("/:id", protect, getBudget);
router.put("/update/:id", protect, updateBudget);
router.delete("/delete/:id", protect, deleteBudget);

export default router;
