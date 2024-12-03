import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
  lastName: { type: String, required: true },
  isStudent: { type: Boolean, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
});

export const UserModel = mongoose.model('User', UserSchema);
