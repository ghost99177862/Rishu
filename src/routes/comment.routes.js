import express from "express";
import { addComment, getCommentsForPost, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", addComment);
router.get("/post/:id", getCommentsForPost); // GET /api/comments/post/:id
router.delete("/:id", deleteComment);

export default router;
