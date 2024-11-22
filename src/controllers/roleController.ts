import prisma from "../prismaClient";
import { Request, Response } from "express";

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  try {
    const role = await prisma.role.create({ data: { name, permissions } });
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  try {
    const role = await prisma.role.update({
      where: { id: Number(id) },
      data: { name, permissions },
    });
    res.json({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.role.delete({ where: { id: Number(id) } });
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
