import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    //@ts-ignore
    req.user = decoded; // Attach user info to the request
    await next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
