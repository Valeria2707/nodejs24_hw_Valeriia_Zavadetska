import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
  lastName: { type: String, required: true },
  isStudent: { type: Boolean, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
