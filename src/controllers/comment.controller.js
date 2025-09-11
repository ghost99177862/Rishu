import { supabase } from "../supabase.js";

/**
 * POST /api/comments
 * body: { post_id, user_id, content }
 */
export const addComment = async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    if (!post_id || !user_id || !content) {
      return res.status(400).json({ error: "post_id, user_id and content required" });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id, user_id, content }])
      .select("*, users(ghost_id, user_id)");

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json({ message: "Comment added", comment: data[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/posts/:id/comments
 */
export const getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const { data, error } = await supabase
      .from("comments")
      .select("*, users(ghost_id, user_id)")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/comments/:id
 */
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ error: "user_id required" });

    // Ensure comment exists & belongs to user
    const { data: comment, error: fetchError } = await supabase
      .from("comments")
      .select("*")
      .eq("id", commentId)
      .single();

    if (fetchError || !comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.user_id !== user_id) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    const { error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (deleteError) return res.status(500).json({ error: deleteError.message });

    return res.json({ message: "Comment deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
