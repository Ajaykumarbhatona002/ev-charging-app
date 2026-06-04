import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userEmail: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },
  stationId: { 
    type: Number, 
    required: true 
  },
  stationName: {
    type: String,
    required: true
  },
  chargerWatt: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED'],
    default: 'PENDING'
  },
  cost: {
    type: String,
    required: true
  },
  bookingId: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
