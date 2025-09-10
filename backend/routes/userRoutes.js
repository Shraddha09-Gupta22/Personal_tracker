import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", protect, getUser);
router.delete("/delete", protect, deleteUser);
router.put("/update", protect, updateUser);

export default router;
