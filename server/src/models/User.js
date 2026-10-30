import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'hr', 'manager', 'employee'], default: 'employee' },
  department: { type: String, default: 'General' },
  phone: { type: String, default: '' },
  joiningDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
