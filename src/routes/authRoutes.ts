import express from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

// Signup Endpoint
router.post("/signup", signup);

// Login Endpoint
router.post("/login", login);

export default router;
