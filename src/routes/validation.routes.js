import express from "express";
import { addOrUpdateValidation, getValidationCounts } from "../controllers/validation.controller.js";

const router = express.Router();

router.post("/", addOrUpdateValidation);
router.get("/post/:id", getValidationCounts); // GET /api/validations/post/:id

export default router;
