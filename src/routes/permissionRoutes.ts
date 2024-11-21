import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getPermissions, createPermission, deletePermission } from "../controllers/permissionController";

const router = express.Router();

//@ts-ignore
router.get("/", authenticate, getPermissions);
//@ts-ignore
router.post("/", createPermission);
//@ts-ignore
router.delete("/:id", authenticate, deletePermission);

export default router;
