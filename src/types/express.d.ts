import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id: number;
      email: string;
      role: "admin" | "trader" | "viewer";
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
