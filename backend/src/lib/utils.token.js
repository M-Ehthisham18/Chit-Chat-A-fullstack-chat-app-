import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing!");
    throw new Error("JWT_SECRET is not defined in the environment variables!");
  }

  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};


export default generateToken;
