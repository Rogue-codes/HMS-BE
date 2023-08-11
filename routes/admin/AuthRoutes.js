import express from "express";
import {
  adminLogin,
  adminSignUp,
  getAdmin,
} from "../../controllers/admin/AuthControllers.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", adminSignUp);
router.post("/signin", adminLogin);
router.get("/admin", authMiddleware, getAdmin);

export default router;
