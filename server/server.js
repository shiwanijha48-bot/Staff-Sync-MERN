import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';
import leaveRoutes from './src/routes/leaveRoutes.js';
import announcementRoutes from './src/routes/announcementRoutes.js';
import trainingRoutes from './src/routes/trainingRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'StaffSync API' }));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});
const port = process.env.PORT || 8000;
connectDB().then(() => app.listen(port, () => console.log(`StaffSync API running on http://localhost:${port}`)))
  .catch((err) => { console.error('Database connection failed:', err.message); process.exit(1); });
