import mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const MenuModel = mongoose.model('Menu', MenuSchema);
