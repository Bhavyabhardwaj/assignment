import express from "express";
import { userSignup, adminSignup, login } from "../controllers/authController";
const router = express.Router();

router.post("/signup/user", userSignup); // User Signup
router.post("/signup/admin", adminSignup); // Admin Signup
router.post("/login", login); // Login for both Admin and Users

export default router;
