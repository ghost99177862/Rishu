import { supabase } from "../supabase.js";

/**
 * POST /api/validations
 * body: { post_id, user_id, vote } // vote = true or false
 */
export const addOrUpdateValidation = async (req, res) => {
  try {
    const { post_id, user_id, vote } = req.body;
    if (!post_id || !user_id || typeof vote !== "boolean") {
      return res.status(400).json({ error: "post_id, user_id and boolean vote required" });
    }

    // Check if validation already exists
    const { data: existing, error: fetchError } = await supabase
      .from("validations")
      .select("*")
      .eq("post_id", post_id)
      .eq("user_id", user_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res.status(500).json({ error: fetchError.message });
    }

    if (existing) {
      // Update existing vote
      const { data, error } = await supabase
        .from("validations")
        .update({ vote })
        .eq("id", existing.id)
        .select();

      if (error) return res.status(500).json({ error: error.message });
      return res.json({ message: "Vote updated", vote: data[0] });
    } else {
      // Insert new vote
      const { data, error } = await supabase
        .from("validations")
        .insert([{ post_id, user_id, vote }])
        .select();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ message: "Vote recorded", vote: data[0] });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/posts/:id/validations
 */
export const getValidationCounts = async (req, res) => {
  try {
    const postId = req.params.id;

    const { count: validCount } = await supabase
      .from("validations")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId)
      .eq("vote", true);

    const { count: invalidCount } = await supabase
      .from("validations")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId)
      .eq("vote", false);

    let userVote = null;
    if (req.query.user_id) {
      const { data } = await supabase
        .from("validations")
        .select("vote")
        .eq("post_id", postId)
        .eq("user_id", req.query.user_id)
        .single();

      if (data) userVote = data.vote;
    }

    return res.json({
      post_id: postId,
      valid: validCount,
      invalid: invalidCount,
      your_vote: userVote
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
