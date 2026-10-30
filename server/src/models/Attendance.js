import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date, default: null },
  status: { type: String, enum: ['Present', 'Late', 'Absent'], default: 'Present' }
}, { timestamps: true });
schema.index({ employee: 1, date: 1 }, { unique: true });
export default mongoose.model('Attendance', schema);
