import express from "express";
import { addCollege, getColleges, getCollegeById } from "../controllers/college.controller.js";

const router = express.Router();

router.post("/", addCollege);        // Add a new college
router.get("/", getColleges);        // Get all colleges
router.get("/:id", getCollegeById);  // Get college by ID

export default router;
