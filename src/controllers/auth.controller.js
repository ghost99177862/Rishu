import { supabase } from "../supabase.js";
import { generateGhostId } from "../utils/generateGhostId.js";

export const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Check if user exists
    const { data: existing, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (fetchError) return res.status(500).json({ error: fetchError.message });

    if (existing && existing.length > 0) {
      return res.json({ message: "User already exists", user: existing[0] });
    }

    const ghostId = await generateGhostId();

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, ghost_id: ghostId }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    return res.json({ message: "User created", user: data[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
