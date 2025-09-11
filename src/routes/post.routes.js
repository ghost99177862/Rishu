import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", getAllPosts);

export default router;
