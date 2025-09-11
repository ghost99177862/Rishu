import { supabase } from "../supabase.js";

export const createPost = async (req, res) => {
  try {
    const { user_id, college_id, title, content, media_url, type } = req.body;

    if (!user_id || !college_id || !title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ user_id, college_id, title, content, media_url, type }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: "Post created", post: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(ghost_id), colleges(name)")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
