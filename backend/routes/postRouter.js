import { Router } from "express";
import { handleGetPosts } from "../controllers/postController.js";
const router = Router();

router.get("/posts", handleGetPosts);

export default router;
