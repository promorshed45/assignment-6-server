/* eslint-disable no-useless-escape */
// models/User.ts
import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { USER_ROLE } from './user.constant';

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, trim: true, unique: true, required: true, },
  password: { type: String,},
  role: { type: String, default: USER_ROLE.user },
  address: { type: String, },
  mobileNumber: { type: String, },
});

export const User = mongoose.model<IUser>('User', userSchema);
