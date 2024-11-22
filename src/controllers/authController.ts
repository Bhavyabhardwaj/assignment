import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { generateToken } from "../utils/jwtUtils";

export const userSignup = async (req: Request, res: Response) => {
  const { name, email, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, roleId },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const adminSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, isAdmin } = req.body;
  try {
    const user = isAdmin
      ? await prisma.admin.findUnique({ where: { email } })
      : await prisma.user.findUnique({ where: { email }, include: { role: true } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const tokenPayload = isAdmin
      ? { id: user.id, email: user.email, role: "Admin" }
      : { id: user.id, email: user.email, role: user.role.name };

    const token = generateToken(tokenPayload);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
