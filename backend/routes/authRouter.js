import { Router } from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefresh,
} from "../controllers/authControllers.js";

const router = Router();

export default router
  .get("/", async (req, res) => res.json({ message: "Hello auth" }))
  .get("/refresh", handleRefresh)
  .post("/login", handleLogin)
  .post("/register", handleRegister)
  .get("/logout", handleLogout);
