import { Router } from 'express';
import Training from '../models/Training.js';
import { protect, allowRoles } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
router.get('/', asyncHandler(async (_req, res) => res.json(await Training.find().populate('createdBy','name').sort({ date: 1 }))));
router.post('/', allowRoles('admin','hr','manager'), asyncHandler(async (req, res) => {
  const { title, date } = req.body; if (!title || !date) return res.status(400).json({ message: 'Training title and date are required.' });
  res.status(201).json(await (await Training.create({ ...req.body, createdBy: req.user._id })).populate('createdBy','name'));
}));
router.delete('/:id', allowRoles('admin','hr','manager'), asyncHandler(async (req, res) => {
  const t = await Training.findByIdAndDelete(req.params.id); if (!t) return res.status(404).json({ message: 'Training not found.' }); res.json({ message: 'Training deleted.' });
}));
export default router;
