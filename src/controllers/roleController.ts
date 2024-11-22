import { Request, Response } from "express";
import prisma from "../prismaClient";

// Get all roles
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
        permissions: {
          connect: permissions.map((perm: string) => ({ id: perm })),
        },
      },
    });
    res.status(201).json(role);
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
      where: { id: parseInt(id)},
      data: {
        name,
        permissions: {
          connect: permissions.map((perm: string) => ({ id: perm })),
        },
      },
    });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const role = await prisma.role.delete({
      where: { id: parseInt(id)},
    });
    res.status(200).json({ message: "Role deleted", role });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};

// Assign permissions to role
export const assignPermissionsToRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  try {
    const role = await prisma.role.update({
      where: { id: parseInt(roleId) },
      data: {
        permissions: {
          connect: permissions.map((perm: string) => ({ id: perm })),
        },
      },
    });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error assigning permissions", error });
  }
};
