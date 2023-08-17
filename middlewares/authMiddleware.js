import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

export const authMiddleware = async (req, res, next) => {
  const authToken = req.cookies.token;
  try {
    if (authToken) {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = await Admin.findById(decoded.id);
      !req.user.isVerified
        ? res.status(403).json({
            status: "failed",
            message: "Unauthorized: user not verified",
          })
        : next();
    } else {
      res.status(401).json({
        status: "failed",
        message: "Unauthorized: token not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Invalid token",
    });
  }
};
