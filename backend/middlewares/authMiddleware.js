import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    // console.log("protect ", req.params);
    const authHeader = req.headers.authorization || "";

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    // console.log("token", token);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid Token.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode);

    const user = await User.findById(decode.userId);
    // console.log("user", user);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

export default protect;
