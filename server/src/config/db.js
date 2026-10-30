import mongoose from 'mongoose';
import Attendance from '../models/Attendance.js';

export default async function connectDB() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing. Copy .env.example to .env and configure it.');
  await mongoose.connect(process.env.MONGO_URI);

  // Older StaffSync builds used { user, date } for attendance. That legacy
  // unique index rejects multiple records where user is null. Remove it and
  // keep the current { employee, date } unique index instead.
  const collection = Attendance.collection;
  const indexes = await collection.indexes().catch(() => []);
  const legacy = indexes.find((index) => index.name === 'user_1_date_1');
  if (legacy) {
    await collection.dropIndex('user_1_date_1');
    console.log('Removed obsolete attendance index: user_1_date_1');
  }
  await Attendance.syncIndexes();
  console.log('MongoDB connected');
}
