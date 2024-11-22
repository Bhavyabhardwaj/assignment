import { Request, Response } from "express";
import prisma from "../prismaClient";

// Fetch all permissions
export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await prisma.permission.findMany();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching permissions", error });
  }
};

// Create a permission
export const createPermission = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    //@ts-ignore
    const permission = await prisma.permission.create({ data: { name } });
    res.status(201).json({ message: "Permission created successfully", permission });
  } catch (error) {
    res.status(500).json({ message: "Error creating permission", error });
  }
};

// Update a permission
export const updatePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const permission = await prisma.permission.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.status(200).json({ message: "Permission updated successfully", permission });
  } catch (error) {
    res.status(500).json({ message: "Error updating permission", error });
  }
};

// Delete a permission
export const deletePermission = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.permission.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting permission", error });
  }
};
