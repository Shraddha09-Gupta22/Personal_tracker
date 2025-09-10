import User from "../models/userModel.js";
import Expense from "../models/expenseModel.js";
import bcrypt from "bcryptjs";

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", req.params.id);
    const user = await User.findById(id).select("-password");
    console.log(user);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get user succesfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in getting user.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;
    // console.log(id);

    await Expense.deleteMany(id);

    const user = await User.findByIdAndDelete(id);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Error in deleting the user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting user.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const { name, email, password } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    console.log("update user: ", updatedUser);

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User successfully updated.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updateUser.",
    });
  }
};

export { getUser, deleteUser, updateUser };
