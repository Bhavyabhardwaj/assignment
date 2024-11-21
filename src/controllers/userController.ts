import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prismaClient"; // Import the Prisma Client

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { role: true } });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, roleId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, status } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email, status },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.status(204).end();
};
