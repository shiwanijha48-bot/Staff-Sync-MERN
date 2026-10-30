import { Router } from 'express';
import Leave from '../models/Leave.js';
import { protect, allowRoles } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
router.get('/', asyncHandler(async (req, res) => {
  const query = ['hr','manager'].includes(req.user.role) && req.query.all === 'true' ? {} : { employee: req.user._id };
  res.json(await Leave.find(query).populate('employee','name email department').populate('reviewedBy','name').sort({ createdAt: -1 }));
}));
router.post('/', asyncHandler(async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  if (!startDate || !endDate || !reason) return res.status(400).json({ message: 'Start date, end date and reason are required.' });
  if (new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: 'End date cannot be before start date.' });
  res.status(201).json(await Leave.create({ employee: req.user._id, leaveType, startDate, endDate, reason }));
}));
router.patch('/:id/review', allowRoles('admin','hr','manager'), asyncHandler(async (req, res) => {
  const { status, reviewNote } = req.body;
  if (!['Approved','Rejected'].includes(status)) return res.status(400).json({ message: 'Status must be Approved or Rejected.' });
  const leave = await Leave.findById(req.params.id); if (!leave) return res.status(404).json({ message: 'Leave request not found.' });
  leave.status = status; leave.reviewNote = reviewNote || ''; leave.reviewedBy = req.user._id; await leave.save();
  res.json(await leave.populate([{ path: 'employee', select: 'name email department' }, { path: 'reviewedBy', select: 'name' }]));
}));
export default router;
