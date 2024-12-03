import mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    reservationTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['reserved', 'canceled', 'visited'],
      default: 'reserved',
    },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export const ReservationModel = mongoose.model(
  'Reservation',
  ReservationSchema,
);
