import { Request, Response } from "express";
import prisma from "../prismaClient";

// Fetch all roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

// Create a role
export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  try {
    const role = await prisma.role.create({
      data: {
        name,
        permissions,
      },
    });

    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

// Update a role
export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  try {
    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data: { name, permissions },
    });

    res.status(200).json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.role.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
