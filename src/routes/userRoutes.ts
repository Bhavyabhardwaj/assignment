import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";

const router = express.Router();

//@ts-ignore
router.get("/", getUsers);
//@ts-ignore
router.post("/", createUser);
//@ts-ignore
router.patch("/:id", updateUser);
//@ts-ignore
router.delete("/:id", authenticate, deleteUser);

export default router;
