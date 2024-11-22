import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/roleMiddleware";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  assignPermissionsToRole,
} from "../controllers/roleController";

const router = express.Router();

// Admin routes to manage roles
router.get("/", authenticate, isAdmin, getRoles); // Get all roles
router.post("/", authenticate, isAdmin, createRole); // Create a new role
router.patch("/:id", authenticate, isAdmin, updateRole); // Update a role
router.delete("/:id", authenticate, isAdmin, deleteRole); // Delete a role

// Admin route to assign permissions to a role
router.post("/:roleId/permissions", authenticate, isAdmin, assignPermissionsToRole); // Assign permissions to a role

export default router;
