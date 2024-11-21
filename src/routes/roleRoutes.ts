import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getRoles, createRole, updateRole, deleteRole } from "../controllers/roleController";

const router = express.Router();

//@ts-ignore
router.get("/", getRoles);
//@ts-ignore
router.post("/", authenticate, createRole);
//@ts-ignore
router.patch("/:id", authenticate, updateRole);
//@ts-ignore
router.delete("/:id", authenticate, deleteRole);

export default router;
