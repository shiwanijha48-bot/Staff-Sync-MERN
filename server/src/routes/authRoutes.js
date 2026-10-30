import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router();
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, department: u.department, phone: u.phone, joiningDate: u.joiningDate });
const tokenFor = (u) => jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' });
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password, department, phone, role = 'employee', roleAccessCode } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
  if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters.' });
  if (!['admin', 'hr', 'manager', 'employee'].includes(role)) return res.status(400).json({ message: 'Choose a valid role.' });
  if (role !== 'employee' && (!process.env.ROLE_SETUP_CODE || roleAccessCode !== process.env.ROLE_SETUP_CODE)) return res.status(403).json({ message: 'A valid administrator-issued role setup code is required for this role.' });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'An account with this email already exists.' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), department: department || 'General', phone: phone || '', role });
  res.status(201).json({ token: tokenFor(user), user: publicUser(user) });
}));
router.post('/login', asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() }).select('+password');
  if (!user || !user.isActive || (req.body.role && req.body.role !== user.role) || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
  res.json({ token: tokenFor(user), user: publicUser(user) });
}));
router.get('/me', protect, (req, res) => res.json({ user: publicUser(req.user) }));
router.patch('/profile', protect, asyncHandler(async (req, res) => {
  const fields = ['name', 'phone', 'department'];
  fields.forEach((f) => { if (req.body[f] !== undefined) req.user[f] = req.body[f]; });
  await req.user.save(); res.json({ user: publicUser(req.user) });
}));
export default router;
