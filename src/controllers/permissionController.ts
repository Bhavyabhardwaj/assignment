import { Request, Response } from "express";
import prisma from "../prismaClient"; // Import the Prisma Client

export const getPermissions = async (req: Request, res: Response) => {
  const permissions = await prisma.permission.findMany();
  res.json(permissions);
};

export const createPermission = async (req: Request, res: Response) => {
  const { name, roleId } = req.body;
  const permission = await prisma.permission.create({
    data: { name, roleId },
  });
  res.status(201).json(permission);
};

export const deletePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.permission.delete({ where: { id: Number(id) } });
  res.status(204).end();
};
