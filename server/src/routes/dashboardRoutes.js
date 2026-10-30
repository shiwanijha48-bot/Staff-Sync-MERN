import { Router } from 'express';
import User from '../models/User.js'; import Attendance from '../models/Attendance.js'; import Leave from '../models/Leave.js'; import Announcement from '../models/Announcement.js'; import Training from '../models/Training.js';
import { protect } from '../middleware/authMiddleware.js'; import { asyncHandler } from '../utils/asyncHandler.js';
const router = Router(); router.use(protect);
router.get('/', asyncHandler(async (req, res) => {
  const today = new Date().toISOString().slice(0,10); const isStaff = ['admin','hr','manager'].includes(req.user.role);
  const [employees, attendanceToday, pendingLeaves, announcements, trainings, myAttendance, myLeaves] = await Promise.all([
    isStaff ? User.countDocuments({ isActive: true }) : Promise.resolve(null),
    isStaff ? Attendance.countDocuments({ date: today }) : Promise.resolve(null),
    isStaff ? Leave.countDocuments({ status: 'Pending' }) : Promise.resolve(null),
    Announcement.countDocuments(), Training.countDocuments({ date: { $gte: new Date() } }),
    Attendance.countDocuments({ employee: req.user._id }), Leave.countDocuments({ employee: req.user._id })
  ]);
  res.json({ employees, attendanceToday, pendingLeaves, announcements, trainings, myAttendance, myLeaves });
}));
export default router;
