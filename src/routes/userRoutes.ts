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
//@ts-ignore
router.get("/", authenticate, isAdmin, getUsers);
//@ts-ignore
router.post("/", authenticate, isAdmin, createUser);
//@ts-ignore
router.patch("/:id", authenticate, isAdmin, updateUser);
//@ts-ignore
router.delete("/:id", authenticate, isAdmin, deleteUser);

export default router;
