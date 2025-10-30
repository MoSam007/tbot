import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Define valid role types
export type UserRole = "admin" | "trader" | "viewer";

// Extend Express Request type
export interface AuthRequest extends Request {
  user?: {
    id: number;
    userId: number;
    role: UserRole;
    email: string;
  };
}

// basic auth check
export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: UserRole; email: string };
    // Map the decoded token to our user structure
    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email
    };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// role-based guard
export const requireRole = (role: UserRole) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
};
