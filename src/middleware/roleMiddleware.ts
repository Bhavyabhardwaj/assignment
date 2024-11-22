import { Request, Response, NextFunction } from "express";

// Check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
   //@ts-ignore
  const user = req.user; // This comes from the authenticate middleware

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next(); // Allow the request to continue if the user is an admin
};
