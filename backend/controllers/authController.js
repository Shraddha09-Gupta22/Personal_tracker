import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not found");
      res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      console.log("password not correct");
      res.status(401).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Login successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in Login.",
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      res.status(400).json({
        success: false,
        message: "Email already exist.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      newUser,
      message: "User registered successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in register.",
    });
  }
};

export { login, register };
