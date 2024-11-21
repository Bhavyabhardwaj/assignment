import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";

const router = express.Router();

//@ts-ignore
router.get("/", authenticate, getRoles);
//@ts-ignore
router.post("/", createRole);
//@ts-ignore
router.patch("/:id", authenticate, updateRole);
//@ts-ignore
router.delete("/:id", authenticate, deleteRole);

export default router;
