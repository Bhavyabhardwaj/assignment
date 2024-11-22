import express from "express";
import { userSignup, adminSignup, login } from "../controllers/authController";
const router = express.Router();

//@ts-ignore
router.post("/signup/user", userSignup); // User Signup
//@ts-ignore
router.post("/signup/admin", adminSignup); // Admin Signup
//@ts-ignore
router.post("/login", login); // Login for both Admin and Users

export default router;
