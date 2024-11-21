import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = verifyToken(token);
    //@ts-ignore
    req.user = user; // Attach user to request
    await next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};
