import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/roleMiddleware";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// Admin-only routes
router.get("/", authenticate, isAdmin, getUsers);
router.get("/:id", authenticate, isAdmin, getUserById);
router.post("/", authenticate, isAdmin, createUser);
router.patch("/:id", authenticate, isAdmin, updateUser);
router.delete("/:id", authenticate, isAdmin, deleteUser);

export default router;
