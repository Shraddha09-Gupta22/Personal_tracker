import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
    enum: ["expense", "income"],
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Expense", expenseSchema);
