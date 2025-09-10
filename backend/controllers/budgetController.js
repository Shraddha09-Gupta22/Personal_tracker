import Budget from "../models/budgetModel.js";

const addBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;
    // console.log(category, amount, month);

    const budget = await Budget.create({
      userId: req.user._id,
      category,
      amount,
      month,
    });

    // console.log(budget);

    res.status(200).json({
      success: true,
      budget,
      message: "Adding Budget Succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in adding Budget.",
    });
  }
};

const getAllBudget = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);

    const allBudget = await Budget.find({ userId: id });
    console.log(allBudget);

    res.status(200).json({
      success: true,
      allBudget,
      message: "Getting all budget succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting all the budget.",
    });
  }
};

const getBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const budgetId = req.params.id;

    const budget = await Budget.find({ userId, _id: budgetId });

    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });
    }

    res.status(200).json({
      success: true,
      budget,
      message: "Getting budget succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Getting budget.",
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });
    }

    const updatedData = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({
        success: true,
        data: updatedBudget,
        message: "Budget updated succesfully.",
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update budget" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const budget = await Budget.findOne({ _id: id, userId });
    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });
    }

    await Budget.deleteOne({ _id: id, userId });

    res
      .status(200)
      .json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete budget" });
  }
};

export { addBudget, getAllBudget, getBudget, updateBudget, deleteBudget };
