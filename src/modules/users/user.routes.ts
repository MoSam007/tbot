import { Router } from "express";
import { registerUser, loginUser, listUsers } from "./user.controller";
import { requireAuth, requireRole } from "../../middleware/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", requireAuth, requireRole("admin"), listUsers);

export default router;
