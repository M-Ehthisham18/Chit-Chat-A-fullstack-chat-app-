import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const protectRoute = async (req, res, next) => {
  try {
    //console.log("Cookies Received:", req.cookies); // ✅ Debug: Log received cookies
    const token = req.cookies?.jwt; // Ensure token is retrieved safely

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided." });
    }

    //console.log("Token Found:", token); // ✅ Debug: Log the token

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded Token:", decoded); // ✅ Debug: Log decoded data

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token." });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export default protectRoute;
