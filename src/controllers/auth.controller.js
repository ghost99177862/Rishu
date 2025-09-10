const prisma = require('../prisma/client');
const jwt = require('jsonwebtoken');
const generateGhostId = require('../utils/generateGhostId');

const otpStore = new Map(); // dev only

exports.signup = async (req, res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({ message: "Email required" });
  const otp = String(Math.floor(100000 + Math.random()*900000));
  otpStore.set(email, otp);
  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: "OTP sent (check logs)" });
};

exports.verify = async (req, res) => {
  const { email, otp } = req.body;
  if(!email || !otp) return res.status(400).json({ message: "Email+OTP required" });
  if(otpStore.get(email) !== otp) return res.status(400).json({ message: "Invalid OTP" });

  let user = await prisma.user.findUnique({ where: { email }});
  if(!user){
    const ghost_id = await generateGhostId();
    user = await prisma.user.create({ data: { email, ghost_id }});
  }
  otpStore.delete(email);

  const token = jwt.sign({ user_id: user.user_id, ghost_id: user.ghost_id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ token, ghost_id: user.ghost_id });
};
