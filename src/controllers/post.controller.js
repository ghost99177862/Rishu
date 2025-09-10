const prisma = require('../prisma/client');

exports.createPost = async (req, res) => {
  const { type, content, college_id } = req.body;
  if(!type || !content || !college_id) return res.status(400).json({ message: "Missing fields" });

  const post = await prisma.post.create({
    data: { user_id: req.user.user_id, college_id: +college_id, type, content }
  });
  res.json(post);
};

exports.getFeed = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
    include: { user: { select: { ghost_id: true }}, college: { select: { name: true }} }
  });
  res.json(posts);
};
