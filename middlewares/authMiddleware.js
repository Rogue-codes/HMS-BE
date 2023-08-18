import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

export const authMiddleware = async (req, res, next) => {
  let authToken 
  try {
    if (req.headers.authorization.startsWith("Bearer")) {
      authToken = req.headers.authorization.split(" ")[1];
      if (!authToken) {
        return res.status(401).json({
          status: "failed",
          message: "Unauthorized: token not found",
        })
      }
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
      req.user = await Admin.findById(decoded.id);
      !req.user.isVerified
        ? res.status(403).json({
            status: "failed",
            message: "Unauthorized: user not verified",
          })
        : next();
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};
