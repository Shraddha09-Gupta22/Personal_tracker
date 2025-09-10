import Expense from "../models/expenseModel.js";

const addExpense = async (req, res) => {
  try {
    const { amount, category, type, description, date } = req.body;

    if (!amount || !category || !type) {
      return res.status(400).json({
        success: false,
        message: "Amount, Category and Type are required.",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type must be either income or expense",
      });
    }

    const newExpense = await Expense.create({
      userId: req.user._id,
      amount: Number(amount),
      category: category.trim(),
      type,
      description: description.trim() || "",
      date: date ? new Date(date) : undefined,
    });

    res.status(200).json({
      success: true,
      expense: newExpense,
      message: "Succesfully added expense.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in add expense.",
    });
  }
};

const getAllExpense = async (req, res) => {
  try {
    const id = req.user.userId;
    console.log(id);

    const allExpense = await Expense.find({ id }).sort({ date: -1 });
    console.log(allExpense);
    res.status(200).json({
      success: true,
      expense: allExpense,
      message: "Getting all the expenses succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting all expenses.",
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ _id: expenseId, userId });
    console.log(expense);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }
    const { amount, category, type, description, date } = req.body;
    console.log(req.body);

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (type && ["income", "expense"].includes(type)) {
      expense.type = type;
    }

    if (description !== undefined) {
      expense.description = description;
    }

    if (date) {
      expense.date = new Date(date);
    }

    const newExpense = await expense.save();

    res.status(200).json({
      success: true,
      expense: newExpense,
      message: "Expense updated succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating expenses.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenseId = req.params.id;
    console.log(userId, expenseId);

    const expense = await Expense.findOne({ _id: expenseId, userId });
    console.log(expense);

    if (!expense) {
      res.status(400).json({
        success: false,
        message: "Expense not found.",
      });
    }

    await Expense.deleteOne({ _id: expenseId });

    res.status(200).json({
      success: true,
      message: "Expense deleted succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting expense.",
    });
  }
};

export { addExpense, getAllExpense, updateExpense, deleteExpense };
