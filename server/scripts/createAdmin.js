import 'dotenv/config';
import mongoose from 'mongoose'; import bcrypt from 'bcryptjs'; import User from '../src/models/User.js';
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i >= 0 ? process.argv[i+1] : fallback; };
try {
  if (!process.env.MONGO_URI) throw new Error('Set MONGO_URI in server/.env first.');
  await mongoose.connect(process.env.MONGO_URI);
  const name=arg('name','StaffSync Admin'), email=arg('email','admin@example.com').toLowerCase(), password=arg('password','ChangeMe123!');
  let user=await User.findOne({email});
  if (user) { user.role='admin'; user.isActive=true; await user.save(); console.log(`Existing user ${email} promoted to Admin.`); }
  else { user=await User.create({name,email,password:await bcrypt.hash(password,12),role:'admin',department:'Human Resources',designation:'System Administrator'}); console.log(`Admin account created: ${email}`); }
  console.log('Use the provided password to sign in, then change it.');
} catch(e) { console.error(e.message); process.exitCode=1; } finally { await mongoose.disconnect(); }
