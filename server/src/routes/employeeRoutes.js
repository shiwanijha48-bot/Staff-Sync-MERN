import { Router } from 'express';
import User from '../models/User.js';
import { protect, allowRoles } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
router.get('/', allowRoles('admin', 'hr', 'manager'), asyncHandler(async (_req, res) => {
  const employees = await User.find({}).select('-password').sort({ createdAt: -1 }); res.json(employees);
}));
router.post('/', allowRoles('admin', 'hr'), asyncHandler(async (req, res) => {
  const { name, email, password, role, department, phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and temporary password are required.' });
  const bcrypt = (await import('bcryptjs')).default;
  const employee = await User.create({ name, email, password: await bcrypt.hash(password, 12), role: ['admin','hr','manager','employee'].includes(role) ? role : 'employee', department, phone });
  res.status(201).json(await User.findById(employee._id).select('-password'));
}));
router.patch('/:id', allowRoles('admin', 'hr'), asyncHandler(async (req, res) => {
  const allowed = ['name','email','role','department','phone','isActive']; const updates = {};
  allowed.forEach((k) => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
  const employee = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
  if (!employee) return res.status(404).json({ message: 'Employee not found.' }); res.json(employee);
}));
router.delete('/:id', allowRoles('admin', 'hr'), asyncHandler(async (req, res) => {
  if (String(req.user._id) === req.params.id) return res.status(400).json({ message: 'You cannot deactivate your own account.' });
  const employee = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password');
  if (!employee) return res.status(404).json({ message: 'Employee not found.' }); res.json({ message: 'Employee deactivated.' });
}));
export default router;
