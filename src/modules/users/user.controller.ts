import { Request, Response } from "express";
import * as userService from "./user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};
