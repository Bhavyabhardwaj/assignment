import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/roleMiddleware";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "../controllers/permissionController";

const router = express.Router();

// Admin routes to manage permissions
//@ts-ignore
router.get("/", authenticate, isAdmin, getPermissions); // Get all permissions
//@ts-ignore
router.post("/", authenticate, isAdmin, createPermission); // Create a new permission
//@ts-ignore
router.patch("/:id", authenticate, isAdmin, updatePermission); // Update a permission
//@ts-ignore
router.delete("/:id", authenticate, isAdmin, deletePermission); // Delete a permission

export default router;
