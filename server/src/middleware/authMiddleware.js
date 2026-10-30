import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Please log in to continue.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development-secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) return res.status(401).json({ message: 'Account is unavailable.' });
    req.user = user;
    next();
  } catch { return res.status(401).json({ message: 'Session expired. Please log in again.' }); }
}
export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ message: 'You do not have permission to perform this action.' });
  next();
};
