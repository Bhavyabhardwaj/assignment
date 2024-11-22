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
//@ts-ignore
router.get("/", authenticate, isAdmin, getRoles); // Get all roles
//@ts-ignore
router.post("/", authenticate, isAdmin, createRole); // Create a new role
//@ts-ignore
router.patch("/:id", authenticate, isAdmin, updateRole); // Update a role
//@ts-ignore
router.delete("/:id", authenticate, isAdmin, deleteRole); // Delete a role
// Admin route to assign permissions to a role
//@ts-ignore
router.post("/:roleId/permissions", authenticate, isAdmin, assignPermissionsToRole); // Assign permissions to a role

export default router;
