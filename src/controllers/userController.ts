// src/controllers/userController.ts
import prisma from "../prismaClient";
import bcrypt from "bcrypt"
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, roleId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  res.status(201).json(user);

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, roleId, status } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, roleId, status },
    });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
