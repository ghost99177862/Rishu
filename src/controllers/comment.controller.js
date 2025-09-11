// src/controllers/comment.controller.js


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

    // validate existence of user and post (helpful to give proper FK error)
    const user = await prisma.user.findUnique({ where: { user_id: Number(user_id) } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const post = await prisma.post.findUnique({ where: { post_id: Number(post_id) } });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = await prisma.comment.create({
      data: {
        post_id: Number(post_id),
        user_id: Number(user_id),
        content,
      },
    });

    // optional: return comment with user ghost_id
    const result = await prisma.comment.findUnique({
      where: { comment_id: comment.comment_id },
      include: {
        user: { select: { user_id: true, ghost_id: true } },
      },
    });

    return res.status(201).json({ message: "Comment added", comment: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/posts/:id/comments
 * fetch comments for post id (most recent first)
 */
export const getCommentsForPost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const comments = await prisma.comment.findMany({
      where: { post_id: postId },
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { ghost_id: true, user_id: true } },
      },
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/comments/:id
 * Delete a comment (only allow deletion if requester is same user or admin; here we only check user)
 * req.body should include user_id to check permission (simple approach)
 */
export const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: "user_id required to authorize delete" });

    const comment = await prisma.comment.findUnique({ where: { comment_id: commentId } });
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.user_id !== Number(user_id)) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    await prisma.comment.delete({ where: { comment_id: commentId } });
    return res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
