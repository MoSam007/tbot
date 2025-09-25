import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./modules/users/user.routes";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Trading Bot API is running 🚀");
});

// Fetch all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/users", userRoutes);

export default app;
