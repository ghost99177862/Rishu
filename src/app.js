import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import commentRoutes from "./routes/comment.routes.js";      // NEW
import validationRoutes from "./routes/validation.routes.js"; // NEW
          // NEW

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);          // better: keep posts separate
app.use("/api/colleges", collegeRoutes);
app.use("/api/comments", commentRoutes);    // NEW
app.use("/api/validations", validationRoutes); // NEW
     

export default app;
