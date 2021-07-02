import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import {UserInfo} from '../controllers/Types/Types'

const User = new mongoose.Schema<UserInfo>({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

User.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export const UserData = mongoose.model('UserData', User)
