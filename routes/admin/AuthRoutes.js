import express from "express";
import {
  adminLogin,
  adminSignUp,
  getAdmin,
  verifyEmail,
} from "../../controllers/admin/AuthControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", adminSignUp);
router.post("/signin", adminLogin);
router.get("/admin", authMiddleware, getAdmin);
router.post("/verify-email", verifyEmail);

export default router;
