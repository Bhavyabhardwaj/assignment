import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

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

    // Find or create the "USER" role
    const userRole = await prisma.role.upsert({
      where: { name: "USER" },
      update: {}, // No updates needed if it exists
      create: { name: "USER" }, // Create the role if it doesn't exist
    });

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
    const token = jwt.sign({ userId: newUser.id, role: userRole.name }, SECRET_KEY, { expiresIn: "1h" });

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

    // Find or create the "ADMIN" role
    const adminRole = await prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {}, // No updates needed if it exists
      create: { name: "ADMIN" }, // Create the role if it doesn't exist
    });

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
    const token = jwt.sign({ userId: newAdmin.id, role: adminRole.name }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error signing up admin", error });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }, // Include role details
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name, // Include role in the token payload
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name, // Include the role name for the client
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
