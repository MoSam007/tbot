import { Request, Response } from "express";
import * as userService from "./user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });
    const user = await userService.createUser(email, password);
    // don't return password in response
    const { password: _p, ...rest } = (user as any);
    res.status(201).json(rest);
  } catch (err: any) {
    if (err?.code === "P2002") { // Prisma unique constraint
      return res.status(409).json({ error: "email already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    // strip passwords
    const safe = users.map(u => {
      // @ts-ignore
      const { password, ...r } = u;
      return r;
    });
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const { token, user } = await userService.loginUser(email, password);

    const { password: _p, ...rest } = user as any;
    res.json({ token, user: rest });
  } catch (err: any) {
    console.error(err);
    res.status(401).json({ error: err.message || "Login failed" });
  }
};