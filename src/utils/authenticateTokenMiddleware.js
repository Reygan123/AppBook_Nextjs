// utils/authenticateTokenMiddleware.js
import jwt from "jsonwebtoken";

export default function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Received Token:", token);
  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
