import { Router } from 'express';
import Announcement from '../models/Announcement.js';
import { protect, allowRoles } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
router.get('/', asyncHandler(async (req, res) => {
  const audience = req.user.role === 'hr' ? ['Everyone','HR'] : req.user.role === 'manager' ? ['Everyone','Managers'] : ['Everyone','Employees'];
  res.json(await Announcement.find({ audience: { $in: audience } }).populate('author','name').sort({ createdAt: -1 }));
}));
router.post('/', allowRoles('admin','hr'), asyncHandler(async (req, res) => {
  const { title, body, audience } = req.body;
  if (!title || !body) return res.status(400).json({ message: 'Title and announcement text are required.' });
  res.status(201).json(await (await Announcement.create({ title, body, audience, author: req.user._id })).populate('author','name'));
}));
router.delete('/:id', allowRoles('admin','hr'), asyncHandler(async (req, res) => {
  const item = await Announcement.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Announcement not found.' }); res.json({ message: 'Announcement deleted.' });
}));
export default router;
