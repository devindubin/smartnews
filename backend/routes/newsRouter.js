import { Router } from "express";
import { getArticlesByTopic } from "../controllers/newsControllers.js";
const router = Router();

router.get("/articles", getArticlesByTopic);

export default router;
