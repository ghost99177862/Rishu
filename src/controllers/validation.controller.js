// src/controllers/validation.controller.js


/**
 * POST /api/validations
 * body: { post_id, user_id, vote } // vote = true (valid) or false (invalid)
 * This endpoint will upsert a vote: create if not exists, update if exists.
 */
export const addOrUpdateValidation = async (req, res) => {
  try {
    const { post_id, user_id, vote } = req.body;
    if (post_id == null || user_id == null || typeof vote !== "boolean") {
      return res.status(400).json({ error: "post_id, user_id and boolean vote required" });
    }

    // check existence
    const user = await prisma.user.findUnique({ where: { user_id: Number(user_id) } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const post = await prisma.post.findUnique({ where: { post_id: Number(post_id) } });
    if (!post) return res.status(404).json({ error: "Post not found" });

    // upsert using unique constraint (post_id + user_id)
    const existing = await prisma.validation.findUnique({
      where: {
        post_id_user_id: {
          post_id: Number(post_id),
          user_id: Number(user_id),
        }
      }
    }).catch(() => null);

    if (existing) {
      const updated = await prisma.validation.update({
        where: { validation_id: existing.validation_id },
        data: { vote }
      });
      return res.json({ message: "Vote updated", vote: updated });
    } else {
      const created = await prisma.validation.create({
        data: {
          post_id: Number(post_id),
          user_id: Number(user_id),
          vote,
        }
      });
      return res.status(201).json({ message: "Vote recorded", vote: created });
    }
  } catch (err) {
    console.error(err);
    // Prisma unique constraint error handling (if race)
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/posts/:id/validations
 * returns counts: { valid: X, invalid: Y }
 */
export const getValidationCounts = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    const validCount = await prisma.validation.count({
      where: { post_id: postId, vote: true }
    });
    const invalidCount = await prisma.validation.count({
      where: { post_id: postId, vote: false }
    });

    // optionally, return user's vote if user_id query provided
    const userVote = req.query.user_id
      ? await prisma.validation.findUnique({
          where: {
            post_id_user_id: {
              post_id: postId,
              user_id: Number(req.query.user_id)
            }
          }
        }).catch(() => null)
      : null;

    return res.json({
      post_id: postId,
      valid: validCount,
      invalid: invalidCount,
      your_vote: userVote ? userVote.vote : null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
