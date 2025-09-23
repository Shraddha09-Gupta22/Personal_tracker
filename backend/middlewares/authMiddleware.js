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
    console.log("decode ", decode);
    req.user = decode;

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

export default protect;
