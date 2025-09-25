import { Router } from "express";
import { registerUser, listUsers } from "./user.controller";

const router = Router();

router.post("/register", registerUser);
router.get("/", listUsers);

export default router;
