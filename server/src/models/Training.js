import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  trainer: { type: String, default: '' },
  date: { type: Date, required: true },
  durationHours: { type: Number, default: 1, min: 1 },
  department: { type: String, default: 'All Departments' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
export default mongoose.model('Training', schema);
