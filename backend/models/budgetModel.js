import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, default: "Overall" },
  amount: Number,
  month: String,
});

export default mongoose.model("Budget", budgetSchema);
