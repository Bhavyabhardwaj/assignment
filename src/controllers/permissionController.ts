import { Request, Response } from "express";
import prisma from "../prismaClient";

// Get all permissions
export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await prisma.permission.findMany();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching permissions", error });
  }
};

// Create permission
export const createPermission = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const permission = await prisma.permission.create({
      //@ts-ignore
      data: { name },
    });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Error creating permission", error });
  }
};

// Update permission
export const updatePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const permission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Error updating permission", error });
  }
};

// Delete permission
export const deletePermission = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const permission = await prisma.permission.delete({
      where: { id: parseInt(id)},
    });
    res.status(200).json({ message: "Permission deleted", permission });
  } catch (error) {
    res.status(500).json({ message: "Error deleting permission", error });
  }
};
