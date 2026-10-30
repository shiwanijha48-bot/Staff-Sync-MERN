import { Router } from 'express';
import Attendance from '../models/Attendance.js';
import { protect, allowRoles } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
const today = () => new Date().toISOString().slice(0,10);
router.get('/', asyncHandler(async (req, res) => {
  const query = ['hr','manager'].includes(req.user.role) && req.query.all === 'true' ? {} : { employee: req.user._id };
  if (req.query.date) query.date = req.query.date;
  res.json(await Attendance.find(query).populate('employee','name email department').sort({ date: -1 }).limit(250));
}));
router.post('/check-in', asyncHandler(async (req, res) => {
  const date = today(); let record = await Attendance.findOne({ employee: req.user._id, date });
  if (record) return res.status(409).json({ message: 'You have already checked in today.' });
  try {
    record = await Attendance.create({ employee: req.user._id, date, checkIn: new Date(), status: 'Present' });
    res.status(201).json(record);
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ message: 'Attendance is already recorded for your account today. Refresh the page to see it.' });
    throw error;
  }
}));
router.patch('/check-out', asyncHandler(async (req, res) => {
  const record = await Attendance.findOne({ employee: req.user._id, date: today() });
  if (!record) return res.status(404).json({ message: 'Check in first.' });
  if (record.checkOut) return res.status(409).json({ message: 'You have already checked out today.' });
  record.checkOut = new Date(); await record.save(); res.json(record);
}));
router.post('/manual', allowRoles('admin','hr'), asyncHandler(async (req, res) => {
  const { employee, date, status } = req.body;
  if (!employee || !date) return res.status(400).json({ message: 'Employee and date are required.' });
  const record = await Attendance.findOneAndUpdate({ employee, date }, { employee, date, status: status || 'Present', checkIn: new Date(`${date}T09:00:00`) }, { upsert: true, new: true, runValidators: true }); res.status(201).json(record);
}));
export default router;
