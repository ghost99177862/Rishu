import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import collegeRoutes from "./routes/college.routes.js";         

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", postRoutes);
app.use("/api/colleges", collegeRoutes);

export default app;


