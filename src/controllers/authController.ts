import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

// User Signup
export const userSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the "USER" role by name
    const userRole = await prisma.role.findUnique({ where: { name: "USER" } });
    if (!userRole) {
      return res.status(404).json({ message: "Role 'USER' not found" });
    }

    // Create the new user with the roleId
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: userRole.id, // Assign the roleId
      },
    });

    // Create JWT token
    const token = jwt.sign({ userId: newUser.id, role: userRole.name }, "your_secret_key", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up user", error });
  }
};

// Admin Signup
export const adminSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the "ADMIN" role by name
    const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
    if (!adminRole) {
      return res.status(404).json({ message: "Role 'ADMIN' not found" });
    }

    // Create the new admin with the roleId
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: adminRole.id, // Assign the roleId
      },
    });

    // Create JWT token
    const token = jwt.sign({ userId: newAdmin.id, role: adminRole.name }, "your_secret_key", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up admin", error });
  }
};
