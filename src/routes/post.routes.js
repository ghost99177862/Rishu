import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

// POST /api/posts
router.post("/", createPost);

// GET /api/posts
router.get("/", getAllPosts);

export default router;
