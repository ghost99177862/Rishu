import express from "express";
import { supabase } from "./supabase.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add user API
app.post("/add-user", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  // check if user already exists
  const { data: existing, error: fetchError } = await supabase
    .from("parvat")
    .select("*")
    .eq("email", email)
    .limit(1);

  if (fetchError) return res.status(500).json({ error: fetchError.message });

  if (!existing || existing.length === 0) {
    const { data, error } = await supabase.from("parvat").insert([{ email }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ message: "User inserted", user: data });
  } else {
    return res.json({ message: "User already exists", user: existing });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("parvat").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Supabase API is running on Render!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
