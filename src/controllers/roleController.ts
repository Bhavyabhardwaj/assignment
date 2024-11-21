  import { Request, Response } from "express";
  import prisma from "../prismaClient";

  export const getRoles = async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({ include: { permissions: true } });
    res.json(roles);
  };

  export const createRole = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const role = await prisma.role.create({ data: { name, description } });
    res.status(201).json(role);
  };

  export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const role = await prisma.role.update({
      where: { id: Number(id) },
      data: { name, description },
    });
    res.json(role);
  };

  export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.role.delete({ where: { id: Number(id) } });
    res.status(204).end();
  };
